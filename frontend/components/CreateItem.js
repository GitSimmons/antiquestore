import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { useState } from 'react'
import { Form, Label, Input, Image } from 'semantic-ui-react'
import Router from 'next/router'

const CREATE_ITEM_MUTATION = gql`
mutation CreateItem(
  $title: String!
  $description: String!
  $price: Int
  $image: String
) {
  createItem(
    title: $title
    description: $description
    price: $price
    image: $image
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
  const [image, setImage] = useState()
  const [largeImage, setLargeImage] = useState()

  const uploadFile = async (file) => {
    const url = 'https://api.cloudinary.com/v1_1/acloudforben/image/upload'
    const data = new FormData()
    data.append('file', file)
    // TODO: Create more appropriate upload preset
    data.append('upload_preset', 'sickfits')
    const res = await fetch(url,
      {
        method: 'POST',
        body: data
      })
    const { secure_url } = await res.json()
    setImage(secure_url)
  }

  const handleSubmit = async (createItem) => {
    setLoading(true)
    await createItem({ variables: {
      title, price, description, image
    } })
    Router.push('/')
  }
  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} refetchQueries={['ALL_ITEMS_QUERY', 'PAGINATION_QUERY']}>
      { createItem =>
        <Form onSubmit={() => handleSubmit(createItem)} loading={loading}>
          <Form.Input required label='Title' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
          <Form.TextArea required label='Description' placeholder='A brief description of the object' onChange={(e) => setDescription(e.target.value)} type='text' />
          <Form.Field>
            <Input labelPosition='right' type='text' placeholder='Amount (in CAD)' onChange={(e) => setPrice(e.target.value * 100)}>
              <Label basic>$</Label>
              <input />
              <Label>.00</Label>
            </Input>
          </Form.Field>
          <Form.Field>
            {image && <Image src={image} size='medium' centered />}
            <input id='upload-image-input' type='file' placeholder='file' onChange={(e) => uploadFile(e.target.files[0])} />
          </Form.Field>
          <Form.Button primary>Submit</Form.Button>
        </Form>
      }
    </Mutation>
  )
}
export default CreateItem
