const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories/:username", (req, res, next) => {
  const sql = `
  SELECT c.name as cat, c.id, i.name, i.price, i.quantity, i.description, i.id as itemid
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
        data.cats
          .find(cat => cat.cat === item.cat)
          .inventory.push({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            description: item.description,
            id: item.itemid
          })
      } else {
        data.cats.push({
          cat: item.cat,
          id: item.id,
          inventory: [
            {
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              description: item.description,
              id: item.itemid
            }
          ]
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

    const insertSql = `INSERT INTO categories (name, user_id) VALUES (?, ?);`
    conn.query(insertSql, [name, user_id], (err2, results2, fields2) => {
      res.json({
        id: results2
      })
    })
  })
})

router.delete("/category/:id", (req, res, next) => {
  const deleteCatSql = "DELETE FROM categories WHERE id = ?;"

  conn.query(deleteCatSql, [req.params.id], (err, results, fields) => {
    const deleteItemSql = "DELETE FROM inventory WHERE cat_id = ?;"

    conn.query(deleteItemSql, [req.params.id], (err, results, fields) => {
      res.json({
        message: results
      })
    })
  })
})

module.exports = router
