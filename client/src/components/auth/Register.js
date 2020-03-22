import React, { useState } from 'react'
import { useAuth, api } from '../../lib/react-auth'
import { Button, Form, Input, Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import validator from "validator"

export default props => {
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [cpasswordError, setCpasswordError] = useState('')
  const { signin } = useAuth()

  let valid = true

  function handleSubmit(e) {
    e.preventDefault()

    if (validator.isEmpty(username)) {
      valid = false
      setUsernameError(' - Please enter a username')
    } else if (username.length < 4) {
      valid = false
      setUsernameError(' - Username must be at least 4 characters')
    } else if (username.length > 14) {
      valid = false
      setUsernameError(' - Username cannot be longer than 14 characters')
    } else {
      setUsernameError('')
    }

    if (!validator.isEmail(email)) {
      valid = false
      setEmailError(' - Please enter a valid email')
    } else {
      setEmailError('')
    }

    if (validator.isEmpty(password)) {
      valid = false
      setPasswordError(' - Please enter a password')
    } else {
      setPasswordError('')
    }

    if (!validator.equals(password, confirmPassword) || confirmPassword === '') {
      valid = false
      setCpasswordError(' - Does not match password')
    } else {
      setCpasswordError('')
    }

    if (valid) {
      api.post('/register', { username, email, password }).then(resp => {
        signin(username, password).then(resp => {
          props.history.push('/inventory/' + username)
        })
      })
    }

  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <Label color={usernameError ? 'red' : 'grey'}>Username{usernameError && usernameError}</Label>
          <Input
            error={usernameError ? true : false}
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
        </Form.Field>
        <Form.Field>
          <Label color={emailError ? 'red' : 'grey'}>Email{emailError && emailError}</Label>
          <Input
            error={emailError ? true : false}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="email@email.com"
          />
        </Form.Field>
        <Form.Field>
          <Label color={passwordError ? 'red' : 'grey'}>Password{passwordError && passwordError}</Label>
          <Input
            error={passwordError ? true : false}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Field>
        <Form.Field>
          <Label color={cpasswordError ? 'red' : 'grey'}>Confirm Password{cpasswordError && cpasswordError}</Label>
          <Input
            error={cpasswordError ? true : false}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  )
}
