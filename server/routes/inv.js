const express = require("express")
const router = express.Router()
const conn = require("../db")

// router.get("/user/category/:slug/inventory", (req, res, next) => {
//   const sql = `SELECT * FROM categories`
//   conn.query(sql, (err, results, fields) => {
//     const invSql = results
//       .filter(i => i.category_id === 0)
//       .map(c => ({
//         ...c,
//         sub: results.filter(i => i.category_id == c.id)
//       }))
//     res.json(invSql)
//   })
// })

router.get("/category/:slug/inventory", (req, res, next) => {
  const sql = `SELECT * FROM inventory`
  conn.query(sql, (err, results, fields) => {
    const inv = results
      .filter(i => i.category_id == null)
      .map(c => ({
        ...c,
        sub: results.filter(i => i.category_id == c.id)
      }))
    const slug = req.params.slug
    const invSql = `SELECT c.id, c.name FROM categories c LEFT JOIN inventory i ON c.inventory_id = i.id WHERE i.slug = ?`
    conn.query(
      "SELECT name FROM inventory WHERE slug = ?",
      [slug],
      (err1, results1, fields1) => {
        conn.query(invSql, [slug], (err, results, fields) => {
          const invName = results[0].name
          res.json(inv, invSql)
        })
      }
    )
  })
})

// combine these two ^ v

// router.get("/category/:slug/inventory", (req, res, next) => {
//   const slug = req.params.slug
//   const sql = `SELECT c.id, c.name FROM categories c LEFT JOIN inventory i ON c.inventory_id = i.id WHERE i.slug = ?`
//   conn.query(
//     "SELECT name FROM inventory WHERE slug = ?",
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

router.post("/inventory/:id", (req, res, next) => {
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

router.delete("/inventory/:id", (req, res, next) => {
  const deleteSql = "DELETE FROM inventory WHERE id = ?"
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
