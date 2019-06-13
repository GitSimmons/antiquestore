import gql from 'graphql-tag'
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
  $images: [String]
) {
  createItem(
    title: $title
    description: $description
    price: $price
    image: $image
    images: $images
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
  const [images, setImages] = useState([])

  const uploadFile = async (file) => {
    const url = 'https://api.cloudinary.com/v1_1/acloudforben/image/upload'
    const data = new FormData()
    data.append('file', file)
    // TODO: Create more appropriate upload preset
    data.append('upload_preset', 'auntsadies')
    data.append('tags', 'browser_upload')
    const res = await fetch(url,
      {
        method: 'POST',
        body: data
      })
    const { secure_url } = await res.json()
    setImages((prevImages) => [...prevImages, secure_url])
  }

  const uploadFiles = async (files) => {
    for (var i = 0; i < files.length; i++) {
      uploadFile(files[i]) // call the function to upload the file
    }
  }

  const handleSubmit = async (createItem) => {
    setLoading(true)
    await createItem({ variables: {
      title, price, description, images, image: images[0]
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
            {images && images.map(image => <Image src={image} key={image} size='medium' centered />)}
            <input id='upload-image-input' multiple accept='image/*' type='file' placeholder='file' onChange={(e) => uploadFiles(e.target.files)} />
          </Form.Field>
          <Form.Button primary>Submit</Form.Button>
        </Form>
      }
    </Mutation>
  )
}
export default CreateItem
