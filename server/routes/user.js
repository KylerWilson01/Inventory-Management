const express = require("express")
const router = express.Router()
const config = require('config')

const sha512 = require('js-sha512')
const randomSalt = require('../utils/randomstring')
const jwt = require('jsonwebtoken')
const conn = require('../db')

router.post('/register', (req, res, next) => {
  const username = req.body.username
  const salt = randomSalt(20)
  const password = sha512(req.body.password + salt)
  const email = req.body.email

  const checksql = `SELECT count(1) as count FROM users WHERE username = ?;`

  conn.query(checksql, [username], (err, results, fields) => {
    if (results[0].count > 0) {
      res.status(409).json({
        message: 'User already exists'
      })
    } else {
      const sql = `INSERT INTO users (username, password, salt, email) VALUES (?, ?, ?, ?);`

      conn.query(sql, [username, password, salt, email], (err1, results1, fields1) => {
        const getSql = `SELECT id FROM users WHERE username = ?;`

        conn.query(getSql, [username], (err2, results2, fields2) => {
          const defaultSql = `INSERT INTO categories (name, user_id) VALUES ('Home', ?);`
          console.log(results2[0].id)

          conn.query(defaultSql, [results2[0].id], (err3, results3, fields3) => {
            res.json({
              usr: `${username} you have an inventory now`
            })
          })
        })
      })
    }
  })
})

router.post('/login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  const getsql = `SELECT username, password, salt FROM users WHERE username = ?;`

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
