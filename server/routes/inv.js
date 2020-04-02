const express = require("express")
const router = express.Router()
const conn = require("../db")
const config = require("../config")
const s3 = require('@auth0/s3')
const md5 = require('md5')

const client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  multipartUploadThreshold: 20971520,
  multipartUploadSize: 15728640,
  s3Options: {
    accessKeyId: config.AWS.KEY,
    secretAccessKey: config.AWS.SECRET,
    region: config.AWS.REGION
  }
})

router.get("/inventory/:catid", (req, res, next) => {
  const sql = `
  SELECT i.cat_id, i.name, i.price, i.quantity, i.description, i.picture
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
  const name = req.body.form.name
  const quantity = req.body.form.quantity
  const price = req.body.form.price
  const description = req.body.form.description
  const catid = req.body.catid

  if (!req.files || Object.keys(req.files).length === 0) {
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
  } else {
    const picture = req.files.picture
    const md5Picture = rename(picture)

    const rename = file =>
      md5(Date.now()) +
      "." +
      file.name
        .replace(/ /g, "-")
        .split(".")
        .pop()

    const params = {
      localFile: file.tempFilePath,

      s3Params: {
        Bucket: config.AWS.BUCKET,
        Key: md5Picture
      }
    }

    const uploader = client.uploadFile(params)

    uploader.on('error', function (err) {
      console.error("unable to upload:", err.stack)
    })

    uploader.on('end', function () {
      const insertSql = `
      INSERT INTO inventory (name, cat_id, price, description, quantity, picture)
      VALUES (?, ?, ?, ?, ?, ?);
      `

      conn.query(
        insertSql,
        [name, catid, price, description, quantity, md5Picture],
        (err2, results2, fields2) => {
          res.json({
            results2
          })
        }
      )
    })
  }
})

router.patch("/inventory", (req, res, next) => {
  const updateSql = "UPDATE inventory SET quantity = ? WHERE id = ?"
  const quantity = req.body.quantity
  const id = req.body.id

  conn.query(updateSql, [quantity, id], (err, results, fields) => {
    res.json({
      results
    })
  })
})

router.delete("/inventory/:id", (req, res, next) => {
  const deleteSql = "DELETE FROM inventory WHERE id = ?;"

  conn.query(deleteSql, [req.params.id], (err, results, fields) => {
    res.json({
      results
    })
  })
})

module.exports = router
