import React, { useState } from "react"
import { useUsers } from "../../hooks"
import { Modal, Button, Input } from "semantic-ui-react"

export default (props) => {
  const { changePassword } = useUsers()
  const [password, setPassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    changePassword(password, props.user)
  }

  return (
    <Modal
      className={props.mode ? "dark" : "light"}
      trigger={<Button className="user">Change Password</Button>}
      content={
        <div className="password">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Password"
              onInput={(e) => setPassword(e.target.value)}
            />
            <Button className="user" content="Change Password" type="submit" />
          </form>
        </div>
      }
    />
  )
}
