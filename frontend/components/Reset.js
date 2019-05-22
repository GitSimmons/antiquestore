import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { Form } from 'semantic-ui-react'
import { useState } from 'react'
import Router from 'next/router'
const RESET_PASSWORD_MUTATION = gql`
mutation resetPassword($password: String!, $confirmPassword: String!, $resetToken: String!) {
  resetPassword(
    password: $password
    confirmPassword: $confirmPassword
    resetToken: $resetToken
  ) {
    id
  }
}
`

const ResetPassword = ({ resetToken }) => {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (resetPasswordMutation) => {
    await resetPasswordMutation({ variables: {
      password,
      confirmPassword,
      resetToken
    } }).then((data) => Router.push('/'))
  }
  return (
    <Mutation mutation={RESET_PASSWORD_MUTATION}>
      {(resetPasswordMutation) => (
        <Form>
          <Form.Input type='password' label='password' onChange={(e) => setPassword(e.target.value)} />
          <Form.Input type='password' label='confirm your password' onChange={(e) => setConfirmPassword(e.target.value)} />
          <Form.Button primary onClick={() => handleSubmit(resetPasswordMutation)}>Reset Password</Form.Button>
        </Form>
      )}

    </Mutation>
  )
}

export default ResetPassword
