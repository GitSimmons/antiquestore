import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Icon, Table } from 'semantic-ui-react'

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE'
] // Ensure that this matches the Permission enum in the backend

const ALL_USERS_QUERY = gql`
 query ALL_USERS_QUERY {
   users {
     id
     name
     email
     permissions
   }
 }
`

const Permissions = () => {
  const handleSelect = (e, possiblePermission, user) => {
    let userNewPermissions = [...user.permissions]
    const index = user.permissions.indexOf(possiblePermission)
    if (index === -1) {
      userNewPermissions.push(possiblePermission)
    } else {
      userNewPermissions.splice(index, 1)
    }
    return userNewPermissions
  }

  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        console.log(data)
        if (loading) { return <p>loading...</p> }

        if (error) { return <p>{error.message}</p> }
        console.log(data)
        return (
          <Table celled structured>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>ID</Table.HeaderCell>
                <Table.HeaderCell colSpan={possiblePermissions.length}> Permissions </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                {possiblePermissions.map(possiblePermission =>
                  <Table.HeaderCell key={possiblePermission}>{possiblePermission}</Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.users.map((user) =>
                <Table.Row key={user.id}>
                  <Table.Cell>{ user.name }</Table.Cell>
                  <Table.Cell>{ user.email }</Table.Cell>
                  <Table.Cell>{ user.id }</Table.Cell>
                  {
                    possiblePermissions.map(possiblePermission =>
                      <Table.Cell onClick={(e) => handleSelect(e, possiblePermission, user)} textAlign='center' selectable key={`${user.id + possiblePermission}`}>
                        {user.permissions.includes(possiblePermission) &&
                        <Icon color='green' name='checkmark' size='large' />
                        }
                      </Table.Cell>
                    )
                  }
                </Table.Row>
              )}
            </Table.Body>

          </Table>)
      }
      }
    </Query>
  )
}

export default Permissions
