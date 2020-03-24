const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/user/categories", (req, res, next) => {
  const sql = `SELECT * FROM categories`
  conn.query(sql, (err, results, fields) => {
    const catSql = results
      .filter(c => c.user_id === 0)
      .map(u => ({
        ...u,
        sub: results.filter(c => c.user_id == u.id)
      }))
    res.json(catSql)
  })
})

router.get("/category/:slug", (req, res, next) => {
  const slug = req.params.slug
  const sql = `SELECT u.id, u.name FROM user u LEFT JOIN categories c ON u.category_id = c.id WHERE c.slug = ?`
  conn.query(
    "SELECT name FROM categories WHERE slug = ?",
    [slug],
    (err1, results1, fields1) => {
      conn.query(sql, [slug], (err, results, fields) => {
        const categoryName = results[0].name
        res.json({
          catName: categoryName
        })
      })
    }
  )
})

router.post("/inventory_id", (req, res, next) => {
  const getSQL = `SELECT id FROM category WHERE slug = ?`
  const insertSql = `INSERT INTO inventory (id, name, category_id, slug) VALUES (?, ?, ?, ?)`
  conn.query(getSQL, [req.body.slug], (err, results, fields) => {
    const invId = results[0].invId
    conn.query(
      insertSql,
      [req.body.name, req.body.inventory, invId],
      (err2, results2, fields2) => {
        res.json({
          id: results2.insertId
        })
      }
    )
  })
})

router.delete("/category/:name", (req, res, next) => {
  const deleteSql = "DELETE FROM inventory WHERE name = ?"
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
