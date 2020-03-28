import React, { useState } from "react"
import { Grid, Image, Input, Button, Icon } from "semantic-ui-react"
import { useInventory } from "../../hooks"

export default props => {
  const { update, del } = useInventory()
  const [quantity, setQuantity] = useState("")
  const [itemid, setItemid] = useState("")

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
          <Image src={props.item.img} />
        </Grid.Column>
        <Grid.Column width={10}>
          <h1>{props.item.name}</h1>
          <p>{props.item.description}</p>
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
