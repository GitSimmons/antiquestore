import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { Form } from 'semantic-ui-react'
import { useState } from 'react'

const SIGNUP_MUTATION = gql`
mutation createUser($name: String, $email: String, $password: String) {
  createUser(
    name: $name
    email: $email
    password: $password
  ) {
    id
  }
}
`

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (signUpMutation) => {
    await signUpMutation({ variables: {
      name, email, password
    } }).then((data) => console.log(data))
  }
  return (
    <Mutation mutation={SIGNUP_MUTATION}>
      {(signUpMutation) => (
        <Form>
          <Form.Input label='name' onChange={(e) => setName(e.target.value)} />
          <Form.Input label='email' onChange={(e) => setEmail(e.target.value)} />
          <Form.Input label='password' onChange={(e) => setPassword(e.target.value)} />
          <Form.Button primary onClick={() => handleSubmit(signUpMutation)}>Sign up</Form.Button>
        </Form>
      )}

    </Mutation>
  )
}

export default SignUp
