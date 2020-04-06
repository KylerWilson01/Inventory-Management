import React, { useState } from "react"
import {
  Grid,
  Image,
  Input,
  Button,
  Modal,
  Item,
  Form
} from "semantic-ui-react"
import { useInventory } from "../../hooks"
import "../../styles/sv.scss"

export default props => {
  const { update, del } = useInventory()
  const [form, setForm] = useState({
    name: props.item.name,
    price: props.item.price,
    description: props.item.description,
    quantity: props.item.quantity
  })
  const [darkMode, setDarkMode] = useState(getInitialMode())

  function getInitialMode() {
    const colorMode = JSON.parse(localStorage.getItem('mode'))
    return colorMode ? colorMode : true
  }

  const img = props.item.picture
    ? `https://inventory-management-project.s3.amazonaws.com/${props.item.picture}`
    : "http://placehold.it/2000"

  function handleUpdate(e) {
    e.preventDefault()
    update(form, this.id)
    setForm({
      name: props.item.name,
      price: props.item.price,
      description: props.item.description,
      quantity: props.item.quantity
    })
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
          <header>
            <h1>{props.item.name}</h1>
            <h2>Quantity: {props.item.quantity}</h2>
          </header>
          <p>{props.item.description}</p>
        </Grid.Column>
        <Grid.Column width={3}>

          {/* Update Item */}

          <Modal
            trigger={
              <Button onClick={e => e.preventDefault}>Update item</Button>
            }
            header={`Update ${props.item.name}`}
            className={darkMode ? 'dark' : 'light'}
            content={
              <Form>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>Item Name</label>
                    <Input
                      onInput={e => handleChange(e, "name")}
                      fluid
                      placeholder={props.item.name}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Quantity</label>
                    <Input
                      onInput={e => handleChange(e, "quantity")}
                      fluid
                      type="number"
                      placeholder={props.item.quantity}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Price $</label>
                    <Input
                      onInput={e => handleChange(e, "price")}
                      type="number"
                      placeholder={props.item.price}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.TextArea
                  onChange={e => handleChange(e, "description")}
                  label="Description"
                  placeholder={props.item.description}
                />
              </Form>
            }
            actions={[
              {
                key: "delete",
                content: "Delete",
                positive: true,
                onClick: handleDelete,
                id: props.item.id
              },
              {
                key: "update",
                content: "Update",
                positive: true,
                onClick: handleUpdate,
                id: props.item.id
              }
            ]}
          />

          {/* Single View */}

          <Modal
            trigger={
              <Button onClick={e => e.preventDefault()}>
                Expanded view
              </Button>
            }
            header={props.item.name}
            className={darkMode ? 'dark' : 'light'}
            content={
              <Item.Group>
                <Item>
                  <Item.Image size="large" src={img} />
                  <Item.Content>
                    <Item.Meta>
                      <p>Quantity: {props.item.quantity}</p>
                    </Item.Meta>
                    <Item.Meta>
                      <span>
                        $
                        {(
                          Number(props.item.quantity) * Number(props.item.price)
                        ).toFixed(2)}{" "}
                        total price for {props.item.name}
                      </span>
                    </Item.Meta>
                    <Item.Meta>
                      <span>
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
