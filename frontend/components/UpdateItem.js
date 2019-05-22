import { gql } from 'apollo-boost'
import { Query, Mutation } from 'react-apollo'
import { useState } from 'react'
import { Form, Label, Input } from 'semantic-ui-react'
import Router from 'next/router'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where:{id: $id}) {
      title
      description
      price
      image
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
mutation UPDATE_ITEM_MUTATION(
  $id: ID!
  $title: String
  $description: String
  $price: Int
  $image: String
) {
  updateItem(
    where: {id: $id}
    data: {
      title: $title
      description: $description
      price: $price
      image: $image
    }
  ) {
    id
    title
  }
}
`

const UpdateItem = (props) => {
  const [updateLoading, setLoading] = useState(false)
  // const [image, setImage] = useState()
  const [updates, setUpdates] = useState()
  // const uploadFile = async (file) => {
  //   const url = 'https://api.cloudinary.com/v1_1/acloudforben/image/upload'
  //   const data = new FormData()
  //   data.append('file', file)
  //   data.append('upload_preset', 'sickfits')
  //   const res = await fetch(url,
  //     {
  //       method: 'POST',
  //       body: data
  //     })
  //   const { secure_url } = await res.json()
  //   console.log(secure_url)
  //   setImage(secure_url)
  // }

  const handleSubmit = async (updateItem, item) => {
    await updateItem({ variables: {
      id: props.id,
      ...updates
    } })
    setLoading(true)
    Router.push('/')
  }
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id: props.id }}>
      {({ data, error, loading }) => {
        if (loading) { return <div>Loading...</div> }
        if (error) { return <div>Error!:{error}</div> }
        return (
          <Mutation mutation={UPDATE_ITEM_MUTATION} refetchQueries={['ALL_ITEMS_QUERY', 'SINGLE_ITEM_QUERY']}>
            { updateItem =>
              <Form onSubmit={() => handleSubmit(updateItem, data.item)} loading={updateLoading}>
                <Form.Input required label='Title' placeholder='Title' defaultValue={data.item.title} onChange={({ target }) => setUpdates(prevState => ({ ...prevState, title: target.value }))} />
                <Form.TextArea required label='Description' placeholder='A brief description of the object' defaultValue={data.item.description} onChange={({ target }) => setUpdates(prev => ({ ...prev, description: target.value }))} type='text' />
                <Form.Field>
                  <Input labelPosition='right' type='text' placeholder='Amount (in CAD)' defaultValue={data.item.price / 100} onChange={({ target }) => setUpdates((prevState) => ({ ...prevState, price: target.value * 100 }))}>
                    <Label basic>$</Label>
                    <input />
                    <Label>.00</Label>
                  </Input>
                </Form.Field>

                {/* TODO: Add edit image functionality
                <Form.Field>
                  {image && <Image src={image} size='medium' centered />}
                  <input id='upload-image-input' type='file' placeholder='file' onChange={(e) => uploadFile(e.target.files[0])} />
                </Form.Field> */}
                <Form.Button primary>Update Item</Form.Button>
              </Form>
            }
          </Mutation>)
      }}
    </Query>
  )
}
export default UpdateItem
