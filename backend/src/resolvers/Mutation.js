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
    const { id } = args.where
    const { data } = args
    console.log(data)
    const item = await ctx.db.mutation.updateItem({
      where: { id },
      data
    })
    return item
  }
}

module.exports = Mutation
