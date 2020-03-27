const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/inventory/:catid", (req, res, next) => {
  const sql = `
  SELECT i.cat_id, i.name, i.price, i.quantity, i.description 
  FROM inventory i
  WHERE i.cat_id = ?;
  `

  conn.query(sql, [req.params.catid], (err, results, fields) => {
    res.json({
      results
    })
  })
})

router.post("/inventory", (req, res, next) => {
  console.log(req.body)
  const name = req.body.name
  const quantity = req.body.quantity
  const price = req.body.price
  const description = req.body.description
  const catid = req.body.catid

  const insertSql = `
    INSERT INTO inventory (name, cat_id, price, description, quantity)
    VALUES (?, ?, ?, ?, ?);
    `

  conn.query(
    insertSql,
    [name, catid, price, description, quantity],
    (err2, results2, fields2) => {
      res.json({
        results2
      })
    }
  )
})

router.patch("/inventory", (req, res, next) => {
  const updateSql = "UPDATE inventory SET quantity = ? WHERE id = ?"
  const quantity = req.body.quantity
  const id = req.body.id
  conn.query(updateSql, [quantity, id], (err, results, fields) => {
    res.json({ results })
  })
})

router.delete("/inventory/:id", (req, res, next) => {
  const deleteSql = "DELETE FROM inventory WHERE id = ?;"
  conn.query(deleteSql, [req.body.id], (err, results, fields) => {
    if (err) {
      res.send({
        code: 400
      })
    } else {
      res.redirect("/category/:slug/inventory")
    }
  })
})

module.exports = router