const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { randomBytes } = require('crypto')

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
  async createItem (parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem({
      data: { ...args }
    })
    return item
  },
  async deleteItem (parent, args, ctx, info) {
    const item = await ctx.db.mutation.deleteItem({
      where: { ...args }
    })
    return item
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
    const user = await ctx.db.query.user({
      where: { email }
    })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
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
  }
}

module.exports = Mutation
