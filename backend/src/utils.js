const hasPermissions = (user, requiredPermissions) => {
  const matchedPermissions = user.permissions.filter((permission) => requiredPermissions.includes(permission))
  if (matchedPermissions.length === 0) {
    throw new Error(
      `You do not have sufficient permissions to perform this operation.`
    )
  }
}

module.exports = hasPermissions
