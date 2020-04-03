import React, { useState } from "react"
import {
  Grid,
  Image,
  Input,
  Button,
  Icon,
  Modal,
  Item
} from "semantic-ui-react"
import { useInventory } from "../../hooks"
import "../../styles/sv.scss"

export default props => {
  const { update, del } = useInventory()
  const [quantity, setQuantity] = useState("")
  const [itemid, setItemid] = useState("")

  const img = props.item.picture ?
    `https://inventory-management-project.s3.amazonaws.com/${props.item.picture}` :
    'http://placehold.it/200'

  function handleUpdate(e) {
    e.preventDefault()
    update(quantity, itemid)
  }

  function handleDelete(e) {
    e.preventDefault()
    del(this.id)
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
          <Modal
            trigger={
              <Button onClick={e => e.preventDefault()}>Expanded view</Button>
            }
            header="Expanded view"
            content={
              <Item.Group>
                <Item>
                  <Item.Image size="large" src={props.item.image} />

                  <Item.Content>
                    <Item.Header>{props.item.name}</Item.Header>
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
                      <form className="quantity" onSubmit={handleUpdate}>
                        <Input
                          onInput={e => setQuantity(e.target.value)}
                          onFocus={e => setItemid(props.item.id)}
                          placeholder="9"
                          type="number"
                        />
                      </form>
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
        <Grid.Column width={3}>
          <div className="top">
            <Icon id={props.item.id} onClick={handleDelete} name="close" />
            <p>Quantity: {props.item.quantity}</p>
          </div>
          <form onSubmit={handleUpdate}>
            <Input
              onInput={e => setQuantity(e.target.value)}
              onFocus={e => setItemid(props.item.id)}
              placeholder="9"
              type="number"
            />
            <Button type="submit" content="Update" />
          </form>
          <p>
            $
            {(Number(props.item.quantity) * Number(props.item.price)).toFixed(
            2
          )}{" "}
            total price for {props.item.name}
          </p>
          <p>
            {Number(props.item.price)
              ? `$${props.item.price.toFixed(2)}`
              : `$${props.item.price}`}{" "}
            per {props.item.name}
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
