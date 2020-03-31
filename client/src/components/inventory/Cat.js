import React, { useState } from 'react'
import { Tab, Form, Input, Modal, Label, Button } from 'semantic-ui-react'

import { useInventory } from '../../hooks'

import Items from "./Items"

export default props => {
  const cats = props.cat
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    quantity: ""
  })
  const [catid, setCatid] = useState("")
  const { post } = useInventory()

  function handleChange(e, field) {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }

  function handlePost(e) {
    e.preventDefault()
    post(form, catid)
    setForm({})
  }

  return (
    <>
      <form className="searchbar">
        <Input action="search" placeholder="Search..." />
        <Modal
          trigger={<Button>Add a New Item</Button>}
          header="Add Item"
          content={
            <Form>
              {setCatid(cats.cat.id)}
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Item Name</label>
                  <Input
                    onInput={e => handleChange(e, "name")}
                    fluid
                    placeholder="Orange"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Quantity</label>
                  <Input
                    onInput={e => handleChange(e, "quantity")}
                    fluid
                    type="number"
                    placeholder="5"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Price</label>
                  <Input
                    onInput={e => handleChange(e, "price")}
                    labelPosition="right"
                    placeholder="6.8"
                  >
                    <Label basic>$</Label>
                    <input />
                  </Input>
                </Form.Field>
              </Form.Group>
              <Form.TextArea
                onChange={e => handleChange(e, "description")}
                label="Description"
                placeholder="Tell us about your item..."
              />
            </Form>
          }
          actions={[
            { key: "done", content: "Add", positive: true, onClick: handlePost }
          ]}
        />
      </form>
      {cats.cat.inventory[0].name ? (
        cats.cat.inventory.map((item, i) => (
          <Items item={item} key={"item-" + i} />
        ))
      ) : (
          <h1>Please Enter an Item</h1>
        )}
    </>
  )
}