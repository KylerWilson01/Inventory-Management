const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories/:id", (req, res, next) => {
  const id = req.params.id
  const sql = `SELECT * FROM categories WHERE user_id = ?`
  conn.query(sql, [id], (err, results, fields) => {
    res.json({
      results
    })
  })
})

// router.get("/category/:slug", (req, res, next) => {
//   const slug = req.params.slug
//   const sql = `SELECT u.id, u.name FROM users u LEFT JOIN categories c ON u.categories_id = c.id WHERE c.slug = ?`
//   conn.query(
//     "SELECT name FROM categories WHERE slug = ?",
//     [slug],
//     (err1, results1, fields1) => {
//       conn.query(sql, [slug], (err, results, fields) => {
//         const categoryName = results[0].name
//         res.json({
//           catName: categoryName
//         })
//       })
//     }
//   )
// })

router.post("/categories", (req, res, next) => {
  const getSQL = `SELECT id FROM users WHERE id = ?`

  conn.query(getSQL, [req.body.slug], (err, results, fields) => {
    const insertSql = `INSERT INTO categories (name, user_id, slug) VALUES (?, ?, ?)`
    conn.query(
      insertSql,
      [req.body.name, req.body.user_id, req.body.slug],
      (err2, results2, fields2) => {
        res.json({
          id: results2
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
