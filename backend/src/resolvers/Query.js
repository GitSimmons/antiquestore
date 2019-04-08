const { forwardTo } = require('prisma-binding')
const hasPermissions = require('../utils.js')
const Query = {
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  items: forwardTo('db'),
  // async items (parent, args, ctx, info) {
  //   const items = await ctx.db.query.items()
  //   return items
  // }
  // users: forwardTo('db'),
  async currentUser (parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId }
    }, info)
  },
  async users (parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!')
    }
    hasPermissions(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
    return ctx.db.query.users({}, info)
  }
}

module.exports = Query
