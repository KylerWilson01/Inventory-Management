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
    description: props.item.description,
    pricePerPackage: props.item.pricePerPackage,
    packageQuantity: props.item.packageQuantity,
    quantityPerPackage: props.item.quantityPerPackage,
    itemQuantity: props.item.itemQuantity
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
    console.log(form)
    update(form, this.id)
    setForm({
      name: form.name,
      description: form.description,
      pricePerPackage: form.pricePerPackage,
      packageQuantity: form.packageQuantity,
      quantityPerPackage: form.quantityPerPackage,
      itemQuantity: form.itemQuantity
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
            <h2>Quantity: {(props.item.packageQuantity * props.item.quantityPerPackage) + props.item.itemQuantity}</h2>
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
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Price per Package</label>
                    <Input
                      onInput={e => handleChange(e, "pricePerPackage")}
                      fluid
                      placeholder={props.item.pricePerPackage}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Quantity of Packages</label>
                    <Input
                      onInput={e => handleChange(e, "packageQuantity")}
                      fluid
                      type="number"
                      placeholder={props.item.packageQuantity}
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
                      placeholder={props.item.quantityPerPackage}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Quantity of Lose Items</label>
                    <Input
                      type="number"
                      onInput={e => handleChange(e, "itemQuantity")}
                      fluid
                      placeholder={props.item.itemQuantity}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label>Description</label>
                  <Input
                    onChange={e => handleChange(e, "description")}
                    fluid
                    placeholder={props.item.description}
                  />
                </Form.Field>
              </Form>
            }
            actions={[
              {
                key: "delete",
                content: "Delete Item",
                positive: true,
                onClick: handleDelete,
                id: props.item.id
              },
              {
                key: "update",
                content: "Update Item",
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
                      <p>Quantity: {(props.item.packageQuantity * props.item.quantityPerPackage) + props.item.itemQuantity}</p>
                    </Item.Meta>
                    <Item.Meta>
                      <span>
                        $
                        {
                          Number(((props.item.packageQuantity * props.item.quantityPerPackage) + props.item.itemQuantity) * (props.item.pricePerPackage / props.item.quantityPerPackage)).toFixed(2)
                        }
                      </span>
                    </Item.Meta>
                    <Item.Meta>
                      <span>
                        ${Number(props.item.pricePerPackage / props.item.quantityPerPackage).toFixed(2)}{" "}
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
