import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthProvider, AuthRoute } from "../lib/react-auth"
import "../styles/base.css"
import Auth from "./auth/Auth"
import Inventory from "./inventory/Inventory"
import Home from "./home/Home"

export default props => {
  return (
    <div className="appWrapper">
      <AuthProvider>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Auth} />
          <AuthRoute exact path="/inventory" component={Inventory} />
        </Router>
      </AuthProvider>
    </div>
  )
}
