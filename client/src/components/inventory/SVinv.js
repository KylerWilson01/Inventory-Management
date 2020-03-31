import React, { useState } from "react"
import { Image, Item, Number, Input, Button, Icon } from "semantic-ui-react"
import { useInventory } from " ../../hooks"

export default props => {
  const { update, del } = useInventory()
  const { quantity, setQuantity } = useState("")
  const { itemid, setItemid } = useState("")

  function handleUpdate(e) {
    e.preventDefault()
    update(quantity, itemid)
  }

  function handleDelete(e) {
    e.preventDefault()
    del(this.id)
  }

  return (
    <Item.Group>
      <Item>
        <Item.Image size="large" src={props.item.image} />

        <Item.Content>
          <Item.Header>{props.Item.Header.name}</Item.Header>
          <Item.Meta>
            <span className="totalPrice">
              $
              {(Number(props.item.quantity) * Number(props.item.price)).toFixed(
                2
              )}{" "}
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
          <Item.Description>{props.item.description}</Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}
