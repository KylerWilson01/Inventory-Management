import React, { useState } from "react"
import { useUsers } from "../../hooks"
import { Modal, Button, Input } from "semantic-ui-react"
import { api } from "../../lib/react-auth"

export default (props) => {
  const { changePassword } = useUsers()
  const [password, setPassword] = useState("")
  const username = props.user

  function handleSubmit(e) {
    e.preventDefault()
    api.patch('/password', { password, username })
  }

  return (
    <Modal
      className={props.mode ? "dark" : "light"}
      trigger={<Button className="user">Change Password</Button>}
      content={
        <div className="password">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="New Password"
              onInput={(e) => setPassword(e.target.value)}
            />
            <Button className="user" content="Change Password" type="submit" />
          </form>
        </div>
      }
    />
  )
}
