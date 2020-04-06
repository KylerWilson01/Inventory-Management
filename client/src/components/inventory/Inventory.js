import React, { useState, useEffect } from "react"
import { useAuth, useCats } from "../../hooks"
import { Tab, Button, Icon, Menu, Input, Modal } from "semantic-ui-react"

import "../../styles/darkmode.scss"
import "../../styles/lightmode.scss"

import NewCat from "./NewCat"
import Cat from "./Cat"

export default props => {
  const { profile, signout } = useAuth()
  const { categories, results, delCat, getCats, search } = useCats()
  const [darkMode, setDarkMode] = useState(getInitialMode())

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(darkMode))
    getCats(profile.username)
  }, [categories.length, darkMode])

  function getInitialMode() {
    const colorMode = JSON.parse(localStorage.getItem('mode'))
    return colorMode ? colorMode : true
  }

  function handleCatDel(e) {
    e.preventDefault()
    delCat(this.id)
    getCats(profile.username)
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

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"} >
      <header>
        <Modal
          trigger={<Button>{profile.username}</Button>}
          header='User Settings'
          closeIcon
          className={darkMode ? 'dark' : 'light'}
          content={
            <>
              <Button
                onClick={e => setDarkMode(prevMode => !prevMode)}>
                {darkMode ? 'Change to light mode' : 'Change to dark mode'}
              </Button>
              <Button onClick={e => signout()}>Sign out</Button>
            </>
          }
          actions={[{ key: 'done', content: 'Done', positive: true }]}
        />
        <NewCat />
      </header>
      <br />
      <div className="search-bar">
        <Input
          className="search"
          onInput={handleSearch}
          placeholder="Search..."
        />
      </div>
      <Tab
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </div>
  )
}
