import React from "react"
import { useAuth, useCats } from "../../hooks"
import { Tab, Button, Icon, Menu, Input } from "semantic-ui-react"

import "../../styles/inventory.scss"

import NewCat from "./NewCat"
<<<<<<< HEAD
import Cat from "./Cat"
=======
import Cat from './Cat'
>>>>>>> bbdf5b2905937b9ad9c5889eb5f469c1232084e9

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
<<<<<<< HEAD

  const panes = results[0]
    ? results.map((cat, i) => ({
        menuItem: (
          <Menu.Item key={"cat-" + i}>
            {cat.cat}
            <Icon id={cat.id} onClick={handleCatDel} name="close" />
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Cat props={cat} />
          </Tab.Pane>
        )
      }))
    : categories.map((cat, i) => ({
        menuItem: (
          <Menu.Item key={"cat-" + i}>
            {cat.cat}
            <Icon id={cat.id} onClick={handleCatDel} name="close" />
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Cat props={cat} />
          </Tab.Pane>
        )
      }))
=======
  
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
>>>>>>> bbdf5b2905937b9ad9c5889eb5f469c1232084e9

  return (
    <div className="inventory">
      <header>
        <h1>{profile.username}</h1>
        <Button className="signOut" onClick={e => signout()}>
          Sign out
        </Button>
        <NewCat />
      </header>
      <br />
      <Input
        className="search"
        onInput={handleSearch}
        action="search"
        placeholder="Search..."
      />
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </div>
  )
}
