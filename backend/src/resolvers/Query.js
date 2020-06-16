const { forwardTo } = require("prisma-binding");
const hasPermissions = require("../utils.js");
const Query = {
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  items: forwardTo("db"),
  collections: forwardTo("db"),
  collection: forwardTo("db"),
  // async items (parent, args, ctx, info) {
  //   const items = await ctx.db.query.items()
  //   return items
  // }
  // users: forwardTo('db'),
  async currentUser(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    hasPermissions(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    const order = await ctx.db.query.order({ where: { id: args.id } }, info);
    console.log(order);
    const isOwner = order.user.id === ctx.request.userId;
    const isAdmin = ctx.request.user.permissions.includes("ADMIN");
    console.log(isOwner, isAdmin);
    console.log(!isOwner || !isAdmin);
    if (!isOwner && !isAdmin) {
      throw new Error("You must be logged in!");
    }
    return order;
  },
};

module.exports = Query;
