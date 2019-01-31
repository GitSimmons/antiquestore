import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import Router from 'next/router'

const CREATE_ITEM_MUTATION = gql`
mutation CreateItem(
  $title: String!
  $description: String!
  $price: Int
) {
  createItem(
    title: $title
    description: $description
    price: $price
  ) {
    id
    title
  }
}
`

const CreateItem = () => {
  const [title, setTitle] = useState()
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (createItem) => {
    console.log({ title, price, description })
    setLoading(true)
    await createItem({ variables: {
      title, price, description
    } })
    Router.push('/')
  }
  return (
    <Mutation mutation={CREATE_ITEM_MUTATION}>
      { createItem =>
        <Form onSubmit={() => handleSubmit(createItem)} loading={loading}>
          <Form.Input required label='Title' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
          <Form.TextArea required label='Description' placeholder='A brief description of the object' onChange={(e) => setDescription(e.target.value)} type='text' />
          <Form.Input label='Price' placeholder='Price of the object (in CAD)' onChange={(e) => setPrice(e.target.value * 100)} control='input' type='number' />
          <Form.Button primary>Submit</Form.Button>
        </Form>
      }
    </Mutation>
  )
}
export default CreateItem
