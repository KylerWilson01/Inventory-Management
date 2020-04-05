import React, { useState } from "react"
import {
  Grid,
  Image,
  Input,
  Button,
  Icon,
  Modal,
  Item,
  Form,
  Label
} from "semantic-ui-react"
import { useInventory } from "../../hooks"
import "../../styles/sv.scss"

export default props => {
  const { update, del } = useInventory()
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    quantity: ""
  })

  const img = props.item.picture
    ? `https://inventory-management-project.s3.amazonaws.com/${props.item.picture}`
    : "http://placehold.it/200"

  function handleUpdate(e) {
    e.preventDefault()
    update(form, this.id)
    setForm({})
  }

  function handleDelete(e) {
    e.preventDefault()
    del(this.id)
  }

  function handleChange(e, field) {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }

  return (
    <Grid celled="internally">
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src={img} />
        </Grid.Column>
        <Grid.Column width={10}>
          <h1>{props.item.name}</h1>
          <p>{props.item.description}</p>
        </Grid.Column>
        <Grid.Column width={3}>
          <div className="top">
            <Icon
              className="deleteItem"
              id={props.item.id}
              onClick={handleDelete}
              name="close"
            />
            <p className="quantity">Quantity: {props.item.quantity}</p>
          </div>
          <Modal
            trigger={
              <Button onClick={e => e.preventDefault}>Update item</Button>
            }
            header="Update Item"
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
                    <label className="price">Price</label>
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
                onClick: handleUpdate,
                id: props.item.id
              }
            ]}
          />
          <Modal
            trigger={
              <Button className="ExtV" onClick={e => e.preventDefault()}>
                Expanded view
              </Button>
            }
            header={props.item.name}
            content={
              <Item.Group>
                <Item>
                  <Item.Image size="large" src={props.item.image} />

                  <Item.Content>
                    <Item.Meta>
                      <span className="totalPrice">
                        $
                        {(
                          Number(props.item.quantity) * Number(props.item.price)
                        ).toFixed(2)}{" "}
                        total price for {props.item.name}
                      </span>
                      <span className="pricePer">
                        {Number(props.item.price)
                          ? `$${props.item.price.toFixed(2)}`
                          : `$${props.item.price}`}{" "}
                        per {props.item.name}
                      </span>
                    </Item.Meta>
                    <Item.Description>
                      {props.item.description}
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            }
            closeIcon
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
