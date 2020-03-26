import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'
import { useAuth } from '../../hooks'

export default props => {
  const { profile } = useAuth()


  function handleSubmit(e) {
    e.preventDefault()
    props.history.push('/inventory/' + profile.username)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field required>
        <Input label="New Category Name:" placeholder='Home' />
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  )
}