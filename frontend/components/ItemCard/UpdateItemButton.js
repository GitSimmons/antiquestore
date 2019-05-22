import UpdateItem from '../UpdateItem'
import { Button, Image, Modal } from 'semantic-ui-react'

const UpdateItemButton = ({ item }) =>
  <Modal trigger={<Button primary circular icon='pencil' floated='right' />} dimmer='blurring'>
    <Modal.Header>{item.title}</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src={item.image} />
      <UpdateItem id={item.id} />
    </Modal.Content>
  </Modal>

export default UpdateItemButton
