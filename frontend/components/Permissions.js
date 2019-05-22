import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { Icon, Table, Button } from 'semantic-ui-react'
import { useState } from 'react'
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
const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($id: ID!, $permissions: [Permission]!) {
  modifyPermissions(id: $id, permissions: $permissions) {
    name
    email
  }
}
`
const Permissions = () => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        console.log(data)
        if (loading) { return <p>loading...</p> }

        if (error) { return <p>{error.message}</p> }
        console.log(data)
        return (
          <Table celled structured striped unstackable>
            <Table.Header>
              <Table.Row textAlign='center'>
                <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'>Email</Table.HeaderCell>
                <Table.HeaderCell colSpan={possiblePermissions.length}> Permissions </Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'> Update </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                {possiblePermissions.map(possiblePermission =>
                  <Table.HeaderCell key={possiblePermission}>{possiblePermission}</Table.HeaderCell>
                )}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.users.map((user) =>
                <UserRow user={user} key={user.id} />
              )}
            </Table.Body>

          </Table>)
      }
      }
    </Query>
  )
}

const UserRow = ({ user }) => {
  const [userPermissions, setUserPermissions] = useState([...user.permissions])
  const handleSelect = (e, possiblePermission, user) => {
    if (!userPermissions.includes(possiblePermission)) {
      setUserPermissions((oldPermissions) => oldPermissions.concat(possiblePermission))
    } else {
      setUserPermissions((oldPermissions) => oldPermissions.filter((permission) => permission != possiblePermission))
    }
    return userPermissions
  }

  return (
    <Table.Row key={user.id}>
      <Table.Cell>{ user.name }</Table.Cell>
      <Table.Cell>{ user.email }</Table.Cell>
      {
        possiblePermissions.map(possiblePermission =>
          <Table.Cell
            onClick={(e) => handleSelect(e, possiblePermission, user)}
            textAlign='center'
            selectable
            key={`${user.id + possiblePermission}`}
          >
            {userPermissions.includes(possiblePermission) &&
            <Icon color='green' name='checkmark' size='large' />
            }
          </Table.Cell>
        )
      }
      <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{ id: user.id, permissions: userPermissions }}>
        {(updatePermissions, { error, loading }) =>
          <Table.Cell >
            {error && <p>{error.message}</p>}
            <Button
              disabled={loading}
              onClick={() => {
                return updatePermissions()
              }}
              floated='right'
              icon
              labelPosition='left'
              primary size='small'
            >
              <Icon name='user' /> Updat{loading ? 'ing' : 'e'} Permissions
            </Button>
          </Table.Cell>
        }
      </Mutation>
    </Table.Row>
  )
}
export default Permissions
