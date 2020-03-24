import React from 'react'
import { Form, Button, Input, Label } from 'semantic-ui-react'
import '../../styles/newItem.scss'

export default props => {
  function handleSubmit(e) {
    e.preventDefault()
    props.history.push('/inventory/' + props.match.params.username)
  }
  return (
    <Form className="newItem" onSubmit={handleSubmit}>
      <h1>New Item For Inventory</h1>
      <Form.Group>
        <Label>Item Name</Label>
        <Input placeholder='Samsung Monitors' />
        <Label>Item Price</Label>
        <Input type='text' placeholder='Amount' />
      </Form.Group>
      <Form.Group>
        <Label>One Word Description</Label>
        <Input placeholder='Samsung-Monitors' />
        <Label>Picture Url</Label>
        <Input type='text' placeholder="http://placehold.it/200" />
      </Form.Group>
      <Form.Group>
        <Label>Description</Label>
        <Input placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id cursus metus aliquam eleifend.' />
      </Form.Group>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}