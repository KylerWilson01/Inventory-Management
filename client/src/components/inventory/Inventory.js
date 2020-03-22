import React from 'react'
import { useAuth } from '../../lib/react-auth'

export default props => {
  const { signout } = useAuth()

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={e => signout()}>Sign out</button>
    </div>
  )
}