import React from 'react'
import { useAuth, useInventory } from '../../hooks'
import { Grid, Image, Input } from 'semantic-ui-react'
import "../../styles/inventory.scss"

export default props => {
  const { signout } = useAuth()
  const { inventory } = useInventory()

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <Grid className="inventory" celled>
      <Grid.Row>
        <Grid.Column width={3}>
          <aside>
            <h1>{props.match.params.username}</h1>
            <ul className="tabList">

            </ul>
            <button onClick={e => signout()}>Sign out</button>
            <a href={'/inventory/' + props.match.params.username + '/new-tab'}>NEW</a>
          </aside>
        </Grid.Column>
        <Grid.Column width={13}>
          <form className="searchbar" onSubmit={handleSubmit}>
            <Input action='search' placeholder='Search...' />
          </form>
          <main>
            <ul className="inventoryList">
              {inventory.map((item, i) => (
                <li key={'item-' + i}>
                  <Grid celled='internally'>
                    <Grid.Row>
                      <Grid.Column width={3}>
                        <Image src={item.img} />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <h1>{item.title}</h1>
                        <p>{item.desc}</p>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        <p>{item.quantity}</p>
                        <p>
                          ${Number(item.quantity) * Number(item.eachPrice)} total price for {item.title}
                        </p>
                        <p>{Number(item.eachPrice) < 1 ? `$0${item.eachPrice}` : `$${item.eachPrice}`} per {item.title}</p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </li>
              ))}
            </ul>
            <a href={'/inventory/' + props.match.params.username + '/new-item'}>New Item</a>
          </main>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}