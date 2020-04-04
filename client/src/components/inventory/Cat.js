import React, { useState } from "react"
import { Tab, Input, Form, Modal, Label, Button } from "semantic-ui-react"
import { useInventory } from "../../hooks"
import "../../styles/sv.scss"

import Items from "./Items"

export default props => {
  const cat = props.props
  const { post } = useInventory()
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    quantity: ""
  })

  function handleChange(e, field) {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }

  function handlePost(e) {
    e.preventDefault()
    post(form, this.id)
    setForm({})
  }

  return (
    <Tab.Pane>
      <div className="searchbar">
        <Modal
          trigger={
            <Button onClick={e => e.preventDefault()}>Add a New Item</Button>
          }
          header="Add Item"
          content={
            <Form>
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
            {
              key: "done",
              content: "Add",
              positive: true,
              onClick: handlePost,
              id: cat.id
            }
          ]}
        />
      </div>
      {cat.inventory[0].name ? (
        cat.inventory.map((item, i) => <Items item={item} key={"item-" + i} />)
      ) : (
        <h1>Please Enter an Item</h1>
      )}
    </Tab.Pane>
  )
}
