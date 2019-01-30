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
  }
}

module.exports = Mutation
