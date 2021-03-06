const express = require("express")
const router = express.Router()
const conn = require("../db")

router.get("/categories/:username", (req, res, next) => {
  const sql = `
  SELECT c.name as cat, c.id, i.name, i.pricePerPackage, i.packageQuantity, i.itemQuantity, i.description, i.id as itemid, i.picture, i.quantityPerPackage
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
            pricePerPackage: item.pricePerPackage,
            packageQuantity: item.packageQuantity,
            itemQuantity: item.itemQuantity,
            description: item.description,
            id: item.itemid,
            picture: item.picture,
            quantityPerPackage: item.quantityPerPackage
          })
      } else {
        data.cats.push({
          cat: item.cat,
          id: item.id,
          inventory: [
            {
              name: item.name,
              pricePerPackage: item.pricePerPackage,
              packageQuantity: item.packageQuantity,
              itemQuantity: item.itemQuantity,
              description: item.description,
              id: item.itemid,
              picture: item.picture,
              quantityPerPackage: item.quantityPerPackage
            }
          ]
        })
      }
    })
    res.json(data)
  })
})

router.get("/search/:username/:item", (req, res, next) => {
  const item = `%${req.params.item}%`
  const username = req.params.username

  const searchSql = `
  SELECT c.name as cat, c.id, i.name, i.pricePerPackage, i.packageQuantity, i.itemQuantity, i.description, i.id as itemid, i.picture, i.quantityPerPackage
  FROM users u
  LEFT JOIN categories c
  ON u.id = c.user_id
  LEFT JOIN inventory i
  ON c.id = i.cat_id
  WHERE u.username = ?
  AND i.name LIKE ?;
  `

  conn.query(searchSql, [username, item], (err, results, fields) => {
    let data = { results: [] }
    results.forEach(item => {
      if (data.results.filter(cat => cat.cat === item.cat).length > 0) {
        data.results
          .find(cat => cat.cat === item.cat)
          .inventory.push({
            name: item.name,
            pricePerPackage: item.pricePerPackage,
            packageQuantity: item.packageQuantity,
            itemQuantity: item.itemQuantity,
            description: item.description,
            id: item.itemid,
            picture: item.picture,
            quantityPerPackage: item.quantityPerPackage
          })
      } else {
        data.results.push({
          cat: item.cat,
          id: item.id,
          inventory: [
            {
              name: item.name,
              pricePerPackage: item.pricePerPackage,
              packageQuantity: item.packageQuantity,
              itemQuantity: item.itemQuantity,
              description: item.description,
              id: item.itemid,
              picture: item.picture,
              quantityPerPackage: item.quantityPerPackage
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
