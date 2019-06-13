const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')
const hasPermissions = require('../utils')
const stripe = require('../stripe')

const setCookie = (id, ctx) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET)
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  })
}

const getToken = ({ id, email }) => {
  const token = jwt.sign(
    { id, email },
    process.env.JWT_SECRET,
    { expiresIn: '1y' })
  return token
}

const Mutation = {
  async createItem (parent, { images, ...args }, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to create an item')
    }
    return ctx.db.mutation.createItem({
      data: {
        ...args,
        images: { set: images },
        createdBy: {
          connect: {
            id: ctx.request.userId
          }
        }
      }
    })
  },
  async deleteItem (parent, { id }, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to delete an item')
    }
    const item = await ctx.db.query.item({
      where: { id }
    }, '{id, createdBy {id}}')
    const ownsItem = item.createdBy.id === ctx.request.userId
    const hasPermission = ctx.request.user.permissions.some(
      (permission) => ['ADMIN', 'ITEMDELETE'].includes(permission)
    )
    if (!ownsItem && !hasPermission) {
      throw new Error('Insufficient permissions')
    }
    return ctx.db.mutation.deleteItem({
      where: { id }
    })
  },
  async updateItem (parent, args, ctx, info) {
    const { where, data } = args
    console.log(data)
    const item = await ctx.db.mutation.updateItem({
      where,
      data
    })
    return item
  },
  async createUser (parent, args, ctx, info) {
    if (!args.password || !args.email) {
      throw new Error('Please enter a valid email and password.')
    }
    const saltRounds = 10
    args.email = args.email.toLowerCase()
    const hash = await bcrypt.hash(args.password, saltRounds)
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password: hash, permissions: { set: ['USER'] } }
    })
    setCookie(user.id, ctx)
    return user
  },
  async signIn (parent, { email, password }, ctx, info) {
    if (!email || !password) {
      throw new Error(`Please enter a valid email and password.`)
    }
    const user = await ctx.db.query.user({
      where: { email }
    })
    if (!user) {
      throw new Error(`No user found for email: ${email}.`)
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid Password!')
    }
    setCookie(user.id, ctx)
    return user
  },
  async signOut (parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'Successfully logged out.' }
  },
  async requestReset (parent, { email }, ctx, info) {
    const user = await ctx.db.query.user({
      where: { email }
    })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const resetToken = await randomBytes(16).toString('hex')
    const resetTokenExpiry = Date.now() + 36000000 // 60 minutes
    const updatedUser = await ctx.db.mutation.updateUser({ where: { email },
      data: {
        resetToken,
        resetTokenExpiry
      } })

    // TODO: Actually send an email request. Or y'know, fake it with mailtrap + nodemailer

    return { message: `request password reset for ${email} confirmed, it will expire in 1 hour ` }
  },
  async resetPassword (parent, { resetToken, password, confirmPassword }, ctx, info) {
    const [user] = await ctx.db.query.users(
      {
        where: {
          AND: [{ resetToken },
            { resetTokenExpiry_gte: Date.now() }
          ]
        }
      }
    )
    if (!user) {
      throw new Error('Either your reset token is invalid, or it has expired')
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords don\'t match')
    }
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: { email: user.email },
        data: {
          password: hash,
          resetToken: null,
          resetTokenExpiry: null
        }
      })
    setCookie(user.id, ctx)
    return updatedUser
  },
  async modifyPermissions (parent, { id, permissions }, ctx, info) {
    hasPermissions(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
    const user = await ctx.db.query.user({ where: { id } })
    if (!user) {
      throw new Error('User not found')
    }
    return ctx.db.mutation.updateUser({
      where: { id },
      data: { permissions: { set: [...permissions] } }
    }, info)
  },
  async addToCart (parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that.')
    }
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: ctx.request.userId },
        item: { id: args.id }
      }
    })
    if (existingCartItem) {
      throw new Error(`This item is already in your cart`)
    }
    return ctx.db.mutation.createCartItem({ data: {
      item: {
        connect: {
          id: args.id
        }
      },
      user: {
        connect: {
          id: ctx.request.userId
        }
      } }
    }, info)
  },
  async removeFromCart (parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that.')
    }
    const [item] = await ctx.db.query.cartItems(
      {
        where: {
          id: args.id,
          user: { id: ctx.request.userId }
        }
      }, `{id}`)
    if (!item) {
      throw new Error('No such item')
    }
    return ctx.db.mutation.deleteCartItem({
      where: { id: item.id }
    }, info)
  },
  async createOrder (parent, args, ctx, info) {
    const { userId } = ctx.request
    if (!userId) {
      throw new Error('You must be logged in to do that.')
    }
    const user = await ctx.db.query.user(
      { where: { id: userId } }, `
      { id
        name
        email
        cart {
          id
          item {
            title
            description
            price
            image
          }
        }
      }`)
    const total = user.cart.reduce((accumulator, currentItem) => accumulator + currentItem.item.price, 0)
    const charge = await stripe.charges.create({
      amount: total,
      currency: 'cad',
      source: args.token
    })
    const orderItems = user.cart.map((cartItem) => {
      const orderItem = {
        user: { connect: { id: userId } },
        ...cartItem.item
      }
      delete orderItem.id
      return orderItem
    })
    console.log(orderItems)
    const order = ctx.db.mutation.createOrder({
      data: {
        items: {
          create: orderItems
        },
        user: {
          connect: {
            id: ctx.request.userId
          }
        },
        charge: charge.id,
        total: charge.amount
      }
    })
    const cartItemIds = user.cart.map((cartItem) => cartItem.id)
    await ctx.db.mutation.deleteManyCartItems({ where: { id_in: cartItemIds } })
    return order
  }
}

module.exports = Mutation
