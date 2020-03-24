import React from 'react'
import { Form, Input, Button } from 'semantic-ui-react'

export default props => {
  console.log(props)
  function handleSubmit(e) {
    e.preventDefault()
    props.history.push('/inventory/' + props.match.params.username)
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