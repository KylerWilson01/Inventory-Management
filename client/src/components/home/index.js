import React from "react"
//import logo from "../../assets/simlogo.png"
export default props => {
  return (
    <div className="navlist">
      <img
        src="https://www.freelogodesign.org/file/app/client/thumb/8e55187b-da6c-4819-b0f1-fbebd03421c4_200x200.png?1585340442084"
        alt="simlogo"
      />
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about-us">About Us</a>
        </li>
        <li>
          <a href="/contact-us">Contact Us</a>
        </li>
        <li>
          <a href="/login">Login/Register</a>
        </li>
      </ul>
    </div>
  )
}
