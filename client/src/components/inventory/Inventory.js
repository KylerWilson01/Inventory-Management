import React, { useEffect, useState } from 'react'
import { useAuth, useCats, useInventory } from '../../hooks'
import { Tab, Form, Input, Button, Header, Icon, Modal, Label } from 'semantic-ui-react'
import "../../styles/inventory.scss"
import Items from './Items'
import NewCat from './Cat'

export default props => {
  const { profile, signout } = useAuth()
  const { post } = useInventory()
  const { categories, getCats } = useCats()

  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    quantity: ''
  })
  const [catid, setCatid] = useState('')

  useEffect(() => {
    getCats(profile.username)
  }, [form, categories.length])

  function handleSearch(e) {
    e.preventDefault()
  }

  function handlePost(e) {
    e.preventDefault()
    post(form, catid)
    setForm('')
  }

  function handleChange(e, field) {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }

  const panes = categories.map(cat => (
    {
      menuItem: cat.cat,
      render: () => <Tab.Pane>
        <form className="searchbar" onSubmit={handleSearch}>
          <Input action='search' placeholder='Search...' />
        </form>
        <Modal
          trigger={<Button>Add a New Item</Button>}
          header='Add Item'
          content={<Form>
            {setCatid(cat.id)}
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Item Name</label>
                <Input onInput={e => handleChange(e, 'name')} fluid placeholder='Orange' />
              </Form.Field>
              <Form.Field>
                <label>Quantity</label>
                <Input onInput={e => handleChange(e, 'quantity')} fluid type="number" placeholder='5' />
              </Form.Field>
              <Form.Field>
                <label>Price</label>
                <Input onInput={e => handleChange(e, 'price')} labelPosition='right' placeholder='6.8'>
                  <Label basic>$</Label>
                  <input />
                </Input>
              </Form.Field>
            </Form.Group>
            <Form.TextArea onChange={e => handleChange(e, 'description')} label='Description' placeholder='Tell us about your item...' />
          </Form>}
          actions={[{ key: 'done', content: 'Add', positive: true, onClick: handlePost }]}
        />
        {cat.inventory[0].name ? cat.inventory.map((item, i) => (
          <Items item={item} key={'item-' + i} />
        )) : <h1>Please Enter an Item</h1>}
      </Tab.Pane>
    }
  ))



  return (
    <div className="inventory">
      <header>
        <h1>{profile.username}</h1>
        <button onClick={e => signout()}>Sign out</button>
        <NewCat />
      </header> <br />
      <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
    </div>
  )
}