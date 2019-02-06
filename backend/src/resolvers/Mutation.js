const bcrypt = require('bcryptjs')

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
    return user
  }
}

module.exports = Mutation
