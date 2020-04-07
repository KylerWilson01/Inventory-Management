import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthProvider, AuthRoute } from "../lib/react-auth"
import "../styles/base.css"
import "../styles/darkmode.scss"
import "../styles/lightmode.scss"
import "../styles/singleViewDark.scss"
import "../styles/singleViewLight.scss"
import Auth from "./auth/Auth"
import Inventory from "./inventory/Inventory"
import Home from "./home/Home"

export default props => {
  return (
    <AuthProvider>
      <Router>
        <div className="wrapper">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Auth} />
          <AuthRoute exact path="/inventory" component={Inventory} />
        </div>
      </Router>
    </AuthProvider>
  )
}
