import React from "react"
import { Tab } from "semantic-ui-react"

import logo from "../../assets/logo.png"
import Login from "./Login"
import Register from "./Register"
import Nav from "../home"
import "../../styles/auth.scss"

export default (props) => {
  const panes = [
    {
      menuItem: "Login",
      render: () => (
        <Tab.Pane attached={false}>
          <Login history={props.history} props={props} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Register",
      render: () => (
        <Tab.Pane attached={false}>
          <Register history={props.history} />
        </Tab.Pane>
      ),
    },
  ]

  return (
    <div className="auth">
      <Nav />
      <div className="homeWrapper">
        <div className="background"></div>
        <div className="logo-wrapper">
          <img src={logo} />
        </div>
        <div className="authWrapper">
          <Tab menu={{ secondary: true }} panes={panes} />
        </div>
      </div>
    </div>
  )
}
