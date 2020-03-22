import React from 'react'
import { Tab } from 'semantic-ui-react'

import Login from './Login'
import Register from './Register'

export default props => {
  const panes = [
    {
      menuItem: 'Login',
      render: () => <Tab.Pane attached={false}><Login history={props.history} props={props} /></Tab.Pane>,
    },
    {
      menuItem: 'Register',
      render: () => <Tab.Pane attached={false}><Register history={props.history} /></Tab.Pane>,
    }
  ]

  return (
    <div className="authWrapper">
      <Tab menu={{ secondary: true }} panes={panes} />
    </div>
  )
}