const express = require("express")
const config = require("../config")
const router = express.Router()
const conn = require("../db")
const s3 = require("@auth0/s3")

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

router.post("/upload", (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log([...Object.keys(req)])
    res.status(400).json({ message: "No files were uploaded." })
    return
  }
  const file = req.files.photo

  var params = {
    localFile: file.tempFilePath,

    s3Params: {
      Bucket: config.AWS.BUCKET,
      Key: file.name
    }
  }

  var uploader = client.uploadFile(params)

  uploader.on("error", function(err) {
    console.error("unable to upload:", err.stack)
  })

  uploader.on("end", function() {
    console.log("done uploading")
  })

  res.json({ message: "success" })
})

router.post("/inventory", (req, res, next) => {
  const name = req.body.form.name
  const description = req.body.form.description
  const packageQuantity = req.body.form.packageQuantity
  const quantityPerPackage = req.body.form.quantityPerPackage
  const itemQuantity = req.body.form.itemQuantity
  const pricePerPackage = req.body.form.pricePerPackage

  const catid = req.body.catid
  const picture = req.body.picture ? req.body.picture : ""

  const insertSql = `
    INSERT INTO inventory 
    (name, cat_id, pricePerPackage, description, packageQuantity, itemQuantity, picture, quantityPerPackage)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `

  conn.query(
    insertSql,
    [
      name,
      catid,
      pricePerPackage,
      description,
      packageQuantity,
      itemQuantity,
      picture,
      quantityPerPackage
    ],
    (err2, results2, fields2) => {
      res.json({
        results2
      })
    }
  )
})

router.patch("/inventory", (req, res, next) => {
  console.log(req.body.form)
  const updateSql = `
  UPDATE inventory 
  SET name = ?, packageQuantity = ?, itemQuantity = ?, pricePerPackage = ?, description = ?, quantityPerPackage = ?
  WHERE id = ?;
  `

  const name = req.body.form.name
  const description = req.body.form.description
  const packageQuantity = req.body.form.packageQuantity
  const quantityPerPackage = req.body.form.quantityPerPackage
  const itemQuantity = req.body.form.itemQuantity
  const pricePerPackage = req.body.form.pricePerPackage

  const id = req.body.id

  conn.query(
    updateSql,
    [
      name,
      packageQuantity,
      itemQuantity,
      pricePerPackage,
      description,
      quantityPerPackage,
      id
    ],
    (err, results, fields) => {
      res.json({
        results
      })
    }
  )
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
