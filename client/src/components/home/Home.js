import React from "react"
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react"

import Nav from "./index"
import Homebg from "../../assets/Homebg.png"
import logo from "../../assets/logo.png"

import "../../styles/home.scss"

export default (props) => {
  return (
    <div className="homewrap">
      <Nav />
      <div>
        <Container>
          <div className="banner">
            <Image src={logo} />
            <Button href="/login" content="Get Started" />
          </div>
        </Container>
        <Segment>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header>
                  <h2>We Help Companies and The Individual</h2>
                </Header>
                <p style={{ fontSize: "1.20em" }}>
                  With our Inventory management app, you can streamline your
                  life or business through an easy to use interface. You can
                  create your own custom categories to house your different
                  items for storage into our database that will hold every item
                  you enter! You can give custom descriptions for items, and
                  upload your own images to help better describe different
                  items, and update them on the fly. S.I.M. we aim to simplify
                  your inventory management.
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={8}>
                <Image bordered rounded size="big" src={Homebg} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    </div>
  )
}
