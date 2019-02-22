import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { useState } from 'react'
import { Form, Grid, Button, Segment, Divider, Label, Input, Image, Message } from 'semantic-ui-react'

const LOGIN_MUTATION = gql`
mutation logIn(
  $email: String!
  $password: String!
) {
  signIn(
    email: $email
    password: $password
  ) {
    id
  }
}
`

const Login = () => {
  const [email, setEmail] = useState('benben')
  const [password, setPassword] = useState('benbenben')
  const handleLogin = async (loginMutation) => {
    await loginMutation({ variables: {
      email, password
    } }).catch(err => null)
  }
  return (
    <Mutation mutation={LOGIN_MUTATION}>
      { (loginMutation, { error, loading }) =>
        <Segment placeholder>

          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>

              <Form error={!!error} loading={loading}>

                <Form.Input required label='E-mail' icon='user' iconPosition='left'placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                <Form.Input required label='Password' icon='lock' iconPosition='left'type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <Form.Button primary onClick={() => handleLogin(loginMutation)}> Log me in! </Form.Button>
                <Message
                  error
                  header='Oopsie!'
                  content={error ? error.message : null}
                />
              </Form>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Button content='Sign up' icon='signup' size='big' />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>

        </Segment>
      }
    </Mutation>
  )
}

export default Login
