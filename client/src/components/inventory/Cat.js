<<<<<<< HEAD
import React, { useState } from "react"
import { Tab, Input, Form, Modal, Label, Button } from "semantic-ui-react"
import { useInventory } from "../../hooks"
import "../../styles/sv.scss"

=======
import React, { useState } from 'react'
import { Tab, Input, Form, Modal, Label, Button } from 'semantic-ui-react'
import { useInventory } from '../../hooks'
>>>>>>> bbdf5b2905937b9ad9c5889eb5f469c1232084e9
import Items from "./Items"
const md5 = require('md5')


export default props => {
  const cat = props.props
  const { post, addPic } = useInventory()
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    quantity: ""
  })
  const [image, setImage] = useState(null)
  const [label, setLabel] = useState("Choose a file")

  function handleChange(e, field) {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }

  function handlePost(e) {
    e.preventDefault()
    const rename = file =>
      md5(Date.now()) +
      "." +
      file.name
        .replace(/ /g, "-")
        .split(".")
        .pop()

    const name = rename(image)

    const data = new FormData()
    data.append("photo", image, name)

    addPic(data)
    post(form, this.id, name)
    setForm({})
    setImage(null)
    setLabel("Choose a file")
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
                <Form.Field>
                  <label htmlFor='file' name="label">{label}</label>
                  <Input
                    id="file"
                    type="file"
                    name="image"
                    onChange={e => setImage(e.target.files[0], setLabel(e.target.files[0].name))}
                    fluid
                    accept="image/png, image/jpeg"
                  />
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
