import React from "react"
import { useAuth, useCats } from "../../hooks"
import { Tab, Button, Icon, Menu, Input } from "semantic-ui-react"

import "../../styles/inventory.scss"

import NewCat from "./NewCat"
import Cat from './Cat'

export default props => {
  const { profile, signout } = useAuth()
  const { categories, results, delCat, getCats, search } = useCats()

  function handleCatDel(e) {
    e.preventDefault()
    delCat(this.id)
  }

  function handleSearch(e) {
    e.preventDefault()
    if (e.target.value) {
      search(profile.username, e.target.value)
    } else {
      getCats(profile.username)
      search(profile.username, null)
    }
  }
  
  const panes = results[0] ? results.map((cat, i) => ({
    menuItem: (
      <Menu.Item key={'cat-' + i}>
        {cat.cat}<Icon id={cat.id} onClick={handleCatDel} name="close" />
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane>
        <Cat props={cat} />
      </Tab.Pane>
    )
  })) : categories.map((cat, i) => ({
    menuItem: (
      <Menu.Item key={'cat-' + i}>
        {cat.cat}<Icon id={cat.id} onClick={handleCatDel} name="close" />
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane>
        <Cat props={cat} />
      </Tab.Pane>
    )
  }))

  return (
    <div className="inventory">
      <header>
        <h1>{profile.username}</h1>
        <Button onClick={e => signout()}>Sign out</Button>
        <NewCat />
      </header>
      <br />
      <Input onInput={handleSearch} action="search" placeholder="Search..." />
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </div>
  )
}
