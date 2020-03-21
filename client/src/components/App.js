import React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { AuthProvider, AuthRoute } from "react-auth"

import Login from "./auth/Login"

export default props => {
  return (
    <AuthProvider>
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/" redirect={() => <Redirect path="/" to="/inventory" />} />
      </Router>
    </AuthProvider>
  )
}
