const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories/:username", (req, res, next) => {
  const sql = `
  SELECT c.name as cat, c.id, i.name, i.price, i.quantity, i.description
  FROM users u
  LEFT JOIN categories c
  ON u.id = c.user_id
  LEFT JOIN inventory i
  ON c.id = i.cat_id
  WHERE u.username = ?;
  `

  conn.query(sql, [req.params.username], (err, results, fields) => {
    let data = { cats: [] }

    results.forEach(item => {
      if (data.cats.filter(cat => cat.cat === item.cat).length > 0) {
        data.cats.find(cat => cat.cat === item.cat).inventory.push({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          description: item.description
        })
      } else {
        data.cats.push({
          cat: item.cat,
          id: item.id,
          inventory: [{
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            description: item.description
          }]
        })
      }
    })

    res.json(data)
  })

})

router.post("/categories/:username", (req, res, next) => {
  const username = req.params.username
  const name = req.body.name

  const getSql = `SELECT id FROM users WHERE username = ?;`

  conn.query(getSql, [username], (err, results, fields) => {
    const user_id = results[0].id
    console.log("NAME", name)

    const insertSql = `INSERT INTO categories (name, user_id) VALUES (?, ?);`
    conn.query(insertSql, [name, user_id],
      (err2, results2, fields2) => {
        res.json({
          id: results2
        })
      }
    )
  })
})

router.delete("/category/:name", (req, res, next) => {
  const deleteSql = "DELETE FROM inventory WHERE name = ?;"
  conn.query(deleteSql, [req.body.name], (err, results, fields) => {
    if (err) {
      res.send({
        code: 400
      })
    } else {
      res.redirect("/categories")
    }
  })
})

module.exports = router
