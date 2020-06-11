import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { useState } from 'react'
import { Form, Label, Input, Image } from 'semantic-ui-react'
import Router from 'next/router'
import Search from './Search'

const CREATE_COLLECTION_MUTATION = gql`
mutation CREATE_COLLECTION_MUTATION(
 $name: String
 $items: [String!]!
) {
  createCollection(
    name: $name
    items: $items
  ) {
    name
  }
}
`

const CreateCollection = () => {
  const [name, setName] = useState("")
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const addItem = (id) => {
    // Check for duplicates
    if (items.find(item => item.includes(id))) {
     throw new Error ('Item already in list') 
    }
    setItems((prevItems)=> [...prevItems, id])
  }
  const removeItem = (item) => setItems(
    prevItems => prevItems.filter(comparisonItem => comparisonItem != item)
  )
  const handleSubmit = async (createCollection) => {
    await createCollection({
      variables: {
	name,
	items
      }
    })

  //  Router.push('/')
  }
  const handleSearch = (result) => addItem(result.id)
  
  return (
    <Mutation mutation={CREATE_COLLECTION_MUTATION} >
      {createCollection =>
      <Form onSubmit={() => handleSubmit(createCollection)} loading={loading}>
	  <div style={{height: '5rem'}}/>
	  <Form.Input required label='Name' placeholder='Name' onChange={(e) => setName(e.target.value)} />
	  {name}
	  {items && items.map(item =><p> {item}</p>)} 
	  <Search callbackFn={handleSearch} clear={true} />
	  <Form.Button primary>Submit</Form.Button>
	</Form>
      }
    </Mutation>
  )
}
export default CreateCollection
