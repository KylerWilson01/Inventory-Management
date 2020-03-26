import React, { useEffect } from 'react'
import { useAuth, useCats, useInventory } from '../../hooks'
import { Tab, Grid, Image, Input } from 'semantic-ui-react'
import "../../styles/inventory.scss"

export default props => {
  const { profile, signout } = useAuth()
  const { categories, getCats } = useCats()

  useEffect(() => {
    getCats(profile.username)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
  }

  const panes = categories.map(cat => (
    {
      menuItem: cat.cat,
      render: () => <Tab.Pane>
        <form className="searchbar" onSubmit={handleSubmit}>
          <Input action='search' placeholder='Search...' />
        </form>
        {cat.inventory.length > 1 ? cat.inventory.map(item => (
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={3}>
                <Image src={item.img} />
              </Grid.Column>
              <Grid.Column width={10}>
                <h1>{item.name}</h1>
                <p>{item.description}</p>
              </Grid.Column>
              <Grid.Column width={3}>
                <p>Quantity: {item.quantity}</p>
                <p>
                  ${(Number(item.quantity) * Number(item.price)).toFixed(2)} total price for {item.name}
                </p>
                <p>{Number(item.price) ? `$${item.price.toFixed(2)}` : `$${item.price}`} per {item.name}</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )) : <h1>Please Enter an Item</h1>}
      </Tab.Pane>
    }
  ))



  return (
    <div className="inventory">
      <header>
        <h1>{profile.username}</h1>
        <button onClick={e => signout()}>Sign out</button>
      </header>
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    </div>
  )
}