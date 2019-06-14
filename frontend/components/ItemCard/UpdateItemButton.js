import { useState } from 'react'
import UpdateItem from '../UpdateItem'
import { Button, Image, Modal } from 'semantic-ui-react'

const UpdateItemButton = ({ item }) => {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <Modal
      dimmer='blurring'
      open={open}
      onClose={close}
      trigger={
        <Button
          primary
          circular
          icon='pencil'
          floated='right'
          onClick={() => setOpen(true)}
        />}
    >
      <Modal.Header>{item.title}</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='medium' src={item.image} style={{ paddingRight: '1.5rem' }} />
        <UpdateItem id={item.id} close={close} />
      </Modal.Content>
    </Modal>)
}

export default UpdateItemButton
