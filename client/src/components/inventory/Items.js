import React, { useState, useEffect } from "react"
import {
  Grid,
  Image,
  Input,
  Button,
  Modal,
  Item,
  Form,
} from "semantic-ui-react"
import { useInventory } from "../../hooks"
import md5 from "md5"

export default (props) => {
  const { update, del, picture, addPic } = useInventory()
  const [form, setForm] = useState({
    name: props.item.name,
    description: props.item.description,
    pricePerPackage: props.item.pricePerPackage,
    packageQuantity: props.item.packageQuantity,
    quantityPerPackage: props.item.quantityPerPackage,
    itemQuantity: props.item.itemQuantity,
    picture: props.item.picture,
  })

  const [newImage, setNewImage] = useState(null)

  let image = ""

  picture.map((picture) => {
    if (picture.Key === props.item.picture) {
      image = picture.Key
    }
  })

  const img = image
    ? `https://inventory-management-project.s3.amazonaws.com/${image}`
    : "http://placehold.it/200"

  function handleUpdate(e) {
    e.preventDefault()
    console.log(form)
    if (newImage !== null) {
      const rename = (file) =>
        md5(Date.now()) + "." + file.name.replace(/ /g, "-").split(".").pop()

      const name = rename(newImage)

      const data = new FormData()
      data.append("photo", newImage, name)

      addPic(data)
      update(form, name, this.id)
      setForm({
        name: "",
        description: "",
        pricePerPackage: "",
        packageQuantity: "",
        quantityPerPackage: "",
        itemQuantity: "",
        picture: "",
      })
    } else {
      update(form, form.picture, this.id)
      setForm({
        name: "",
        description: "",
        pricePerPackage: "",
        packageQuantity: "",
        quantityPerPackage: "",
        itemQuantity: "",
        picture: "",
      })
    }
  }

  function handleDelete(e) {
    e.preventDefault()
    del(this.id)
  }

  function handleChange(e, field) {
    setForm({
      ...form,
      [field]: e.target.value,
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
            <h2>
              Quantity:{" "}
              {props.item.packageQuantity * props.item.quantityPerPackage +
                props.item.itemQuantity}
            </h2>
          </header>
          <p>{props.item.description}</p>
        </Grid.Column>
        <Grid.Column width={3}>
          {/* Update Item */}

          <Modal
            trigger={
              <Button
                onClick={(e) =>
                  setForm({
                    name: props.item.name,
                    description: props.item.description,
                    pricePerPackage: props.item.pricePerPackage,
                    packageQuantity: props.item.packageQuantity,
                    quantityPerPackage: props.item.quantityPerPackage,
                    itemQuantity: props.item.itemQuantity,
                    picture: props.item.picture,
                  })
                }
              >
                Update item
              </Button>
            }
            header={`Update ${props.item.name}`}
            className={props.mode ? "dark" : "light"}
            content={
              <Form>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>Item Name</label>
                    <Input
                      onInput={(e) => handleChange(e, "name")}
                      fluid
                      placeholder={props.item.name}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label htmlFor="file" name="label">
                      Choose a file
                    </label>
                    <Input
                      id="file"
                      type="file"
                      name="image"
                      onChange={(e) => setNewImage(e.target.files[0])}
                      fluid
                      accept="image/png, image/jpeg"
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>Price per Package</label>
                    <Input
                      onInput={(e) => handleChange(e, "pricePerPackage")}
                      fluid
                      placeholder={props.item.pricePerPackage}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Quantity of Packages</label>
                    <Input
                      onInput={(e) => handleChange(e, "packageQuantity")}
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
                      onInput={(e) => handleChange(e, "quantityPerPackage")}
                      type="number"
                      fluid
                      placeholder={props.item.quantityPerPackage}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Quantity of Loose Items</label>
                    <Input
                      type="number"
                      onInput={(e) => handleChange(e, "itemQuantity")}
                      fluid
                      placeholder={props.item.itemQuantity}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label>Description</label>
                  <Input
                    onChange={(e) => handleChange(e, "description")}
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
                id: props.item.id,
              },
              {
                key: "update",
                content: "Update Item",
                positive: true,
                onClick: handleUpdate,
                id: props.item.id,
              },
            ]}
          />

          {/* Single View */}

          <Modal
            trigger={
              <Button onClick={(e) => e.preventDefault()}>Expanded view</Button>
            }
            header={props.item.name}
            className={props.mode ? "dark" : "light"}
            content={
              <Item.Group>
                <Item>
                  <Item.Image size="medium" src={img} />
                  <Item.Content>
                    <Item.Meta>
                      <p>
                        Quantity:{" "}
                        {props.item.packageQuantity *
                          props.item.quantityPerPackage +
                          props.item.itemQuantity}
                      </p>
                    </Item.Meta>
                    <Item.Meta>
                      <span>
                        $
                        {Number(
                          (props.item.packageQuantity *
                            props.item.quantityPerPackage +
                            props.item.itemQuantity) *
                            (props.item.pricePerPackage /
                              props.item.quantityPerPackage)
                        ).toFixed(2)}
                      </span>
                    </Item.Meta>
                    <Item.Meta>
                      <span>
                        $
                        {Number(
                          props.item.pricePerPackage /
                            props.item.quantityPerPackage
                        ).toFixed(2)}{" "}
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
