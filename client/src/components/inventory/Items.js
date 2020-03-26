import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

export default props => {
  return (
    <Grid celled='internally'>
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src={props.item.img} />
        </Grid.Column>
        <Grid.Column width={10}>
          <h1>{props.item.name}</h1>
          <p>{props.item.description}</p>
        </Grid.Column>
        <Grid.Column width={3}>
          <p>Quantity: {props.item.quantity}</p>
          <p>
            ${(Number(props.item.quantity) * Number(props.item.price)).toFixed(2)} total price for {props.item.name}
          </p>
          <p>{Number(props.item.price) ? `$${props.item.price.toFixed(2)}` : `$${props.item.price}`} per {props.item.name}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}