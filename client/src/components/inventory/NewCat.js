import React, { useState, useEffect } from "react"
import { Form, Input, Button, Modal } from "semantic-ui-react"
import { useAuth, useCats } from "../../hooks"

export default props => {
  console.log(props)
  const { profile } = useAuth()
  const { addCat } = useCats()
  const [cat, setCat] = useState({
    name: "",
    user: profile.username
  })

  function handleChange(e, field) {
    setCat({
      ...cat,
      [field]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    addCat(cat)
  }

  return (
    <Modal
      trigger={<Button className="newTab">Add a New Tab</Button>}
      header="Add a New Tab"
      className={props.mode ? "dark" : "light"}
      content={
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Tab Name</label>
              <Input
                onInput={e => handleChange(e, "name")}
                fluid
                placeholder="Storage Closet"
              />
            </Form.Field>
          </Form.Group>
        </Form>
      }
      actions={[
        { key: "add-2", content: "Add", positive: true, onClick: handleSubmit }
      ]}
    />
  )
}
