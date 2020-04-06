import React, { useState } from "react"
import { Tab, Input, Form, Modal, Button } from "semantic-ui-react"
import { useInventory } from "../../hooks"
import "../../styles/sv.scss"

import Items from "./Items"
const md5 = require("md5")

export default props => {
  const cat = props.props

  const { post, addPic } = useInventory()

  const [form, setForm] = useState({
    name: "",
    description: "",
    quantityPackage: "",
    quantityPerPackage: "",
    quantityItem: "",
    pricePerPackage: ""
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

    let validPost = true
    if (form.name == '') {
      validPost = false
    }

    if (form.description == '') {
      validPost = false
    }

    if (form.quantityPackage == '' || form.quantityPackage == '0') {
      validPost = false
    }

    if (form.quantityPerPackage == '' || form.quantityPerPackage == '0') {
      validPost = false
    }

    if (form.quantityItem == '' || form.quantityItem == '0') {
      validPost = false
    }

    if (form.pricePerPackage == '' || form.pricePerPackage == '0') {
      validPost = false
    }

    if (validPost) {
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
      setForm({
        name: "",
        price: "",
        description: "",
        quantity: ""
      })
      setImage(null)
      setLabel("Choose a file")
    } else {
      alert("Your item was not added due to an empty or invalid input.")
    }
  }

  return (
    <Tab.Pane>
      <Modal
        trigger={
          <Button onClick={e => e.preventDefault()}>Add a New Item</Button>
        }
        header="Add Item - Please Fill Out All Fields"
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
                <label htmlFor="file" name="label">
                  {label}
                </label>
                <Input
                  id="file"
                  type="file"
                  name="image"
                  onChange={e =>
                    setImage(
                      e.target.files[0],
                      setLabel(e.target.files[0].name)
                    )
                  }
                  fluid
                  accept="image/png, image/jpeg"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Price per Package</label>
                <Input
                  onInput={e => handleChange(e, "price")}
                  fluid
                  placeholder="6.8"
                />
              </Form.Field>
              <Form.Field>
                <label>Quantity of Packages</label>
                <Input
                  onInput={e => handleChange(e, "quantityP")}
                  fluid
                  type="number"
                  placeholder="5"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Quantity per Package</label>
                <Input
                  onInput={e => handleChange(e, "quantityPerPackage")}
                  type="number"
                  fluid
                  placeholder='20'
                />
              </Form.Field>
              <Form.Field>
                <label>Quantity of Items</label>
                <Input
                  type="number"
                  onInput={e => handleChange(e, "quantityItem")}
                  fluid
                  placeholder='100'
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Description</label>
              <Input
                onChange={e => handleChange(e, "description")}
                fuild
                placeholder="Tell us about your item..."
              />
            </Form.Field>
          </Form>
        }
        actions={[
          {
            key: "add",
            content: "Add",
            positive: true,
            onClick: handlePost,
            id: cat.id
          }
        ]}
      />
      {cat.inventory[0].name ? (
        cat.inventory.map((item, i) => <Items item={item} key={"item-" + i} />)
      ) : (
          <h1>Please Enter an Item</h1>
        )}
    </Tab.Pane>
  )
}
