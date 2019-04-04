const { forwardTo } = require('prisma-binding')

const Query = {
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  items: forwardTo('db'),
  // async items (parent, args, ctx, info) {
  //   const items = await ctx.db.query.items()
  //   return items
  // }
  users: forwardTo('db'),
  currentUser (parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId }
    }, info)
  }
}

module.exports = Query
