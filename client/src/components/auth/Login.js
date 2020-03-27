import React, { useState } from "react"
import { useAuth } from "../../lib/react-auth"
//import "../../styles/login.css"

import { Button, Form, Input, Label } from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"

export default props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { signin } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    signin(username, password)
      .then(resp => {
        props.history.push("/inventory")
      })
      .catch(err => console.log("ERROR", err))
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Label color="grey">Username</Label>
          <Input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
          />
        </Form.Field>
        <Form.Field>
          <Label color="grey">Password</Label>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
