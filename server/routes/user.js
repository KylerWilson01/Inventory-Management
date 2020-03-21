const express = require("express")
const router = express.Router()
const config = require('config')
const sha512 = require('js-sha512')
const jwt = require('jsonwebtoken')
const randomSalt = require('../utils/randomstring')
const conn = require('../db')

router.post('/login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  const getsql = `SELECT username, password, salt FROM users WHERE username = ?`

  conn.query(getsql, [username], (salterr, saltresults, saltfields) => {
    if (saltresults.length > 0) {
      const salt = saltresults[0].salt
      const userpass = saltresults[0].password

      if (sha512(password + salt) === userpass) {
        const token = jwt.sign({ username: username }, config.get('secret'))

        res.json({
          token: token
        })
      } else {
        res.status(401).json({
          message: "Invalid username or passoword"
        })
      }
    } else {
      res.status(401).json({
        message: "Invalid username or passoword"
      })
    }
  })
})

module.exports = router
