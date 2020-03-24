const express = require("express")
const userRoutes = require("./routes/user")
const catRoutes = require("./routes/cat")
const invRoutes = require("./routes/inv")

const app = express()
const port = 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", userRoutes)
app.use("/api", catRoutes)
app.use("/api", invRoutes)

app.use((err, req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  res.status(err.status || 500)
  res.json({
    status: err.status,
    error: err
  })
})

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`)
})
