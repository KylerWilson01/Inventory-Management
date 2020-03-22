import React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { AuthProvider, AuthRoute } from "../lib/react-auth"

import Auth from "./auth/Auth"
import Inventory from "./inventory/Inventory"

export default props => {
  return (
    <AuthProvider>
      <Router>
        <Route path="/login" component={Auth} />
        <Redirect path="/" to="/login" />
        <AuthRoute path="/inventory/:username" component={Inventory} />
      </Router>
    </AuthProvider>
  )
}
