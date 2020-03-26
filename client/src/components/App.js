import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthProvider, AuthRoute } from "../lib/react-auth"

import Auth from "./auth/Auth"
import Inventory from "./inventory/Inventory"
import CatForm from "./inventory/Cat"
import ItemForm from "./inventory/Item"
import Home from "./home/Home"
import About from "./home/About"
import Contact from "./home/Contact"

export default props => {
  return (
    <AuthProvider>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/about-us" component={About} />
        <Route path="/contact-us" component={Contact} />
        <Route path="/login" component={Auth} />
        <AuthRoute exact path="/inventory" component={Inventory} />
        <AuthRoute path="/inventory/:username/new-tab" component={CatForm} />
        <AuthRoute path="/inventory/:username/new-item" component={ItemForm} />
      </Router>
    </AuthProvider>
  )
}
