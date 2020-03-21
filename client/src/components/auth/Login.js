import React, { useState } from 'react'
import { useAuth } from 'react-auth'

import { Button, Form } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signin } = useAuth()

  function handleSubmit(e) {
    e.preventDefault()

    signin(username, password).then(resp => {
      console.log('logged in')
      // props.history.push('/chat')
    }).catch(err => console.log('ERROR', err, props))
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}