import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { useState } from 'react'
import { Form, Grid, Button, Segment, Divider, Label, Input, Image, Message, Modal } from 'semantic-ui-react'
import Router from 'next/router'
import User from './User'
import SignUp from './Signup'

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
    name
  }
}
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (loginMutation) => {
    const userData = await loginMutation({ variables: {
      email, password
    } })
    userData &&
    Router.push('/')
  }
  return (
    <Mutation mutation={LOGIN_MUTATION} refetchQueries={['CURRENT_USER_QUERY']}>
      { (loginMutation, { error, loading }) =>
        <Segment placeholder>
          <Grid columns={2} relaxed='very'>
            <Grid.Column>
              <Form error={!!error} >
                <Form.Input required label='E-mail' icon='user' iconPosition='left'placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
                <Form.Input required label='Password' icon='lock' iconPosition='left'type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <Form.Button disabled={loading} primary onClick={() => handleLogin(loginMutation)}> Log me in! </Form.Button>
                <Message
                  error
                  content={error ? `Please enter a valid email and password.` : null}
                />
                {error && <Form.Button> Forgot your password ?</Form.Button>}
              </Form>
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
              <Modal dimmer='blurring' trigger={
                <Button content='Sign up' icon='signup' size='big' />
              }>
                <Modal.Header>
                Create a new account
                </Modal.Header>
                <Modal.Content>
                  <SignUp />
                </Modal.Content>
              </Modal>
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>

        </Segment>
      }
    </Mutation>
  )
}

export default Login
