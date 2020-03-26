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
  const form = req.body.form
  const catid = req.body.catid


  const insertSql = `
    INSERT INTO inventory (name, cat_id, price, description, quantity)
    VALUES (?, ?, ?, ?, ?);
    `

  conn.query(insertSql, [form.name, catid, form.price, form.description, form.quantity], (err2, results2, fields2) => {
    res.json({
      results2
    })
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