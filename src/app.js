const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// create express app
const app = express()
app.use(cors())
app.use(bodyParser.json({ limit: process.env.MAX_REQUEST_BODY_SIZE }))

app.use('/applications', require('./routes/applications'))
app.use('/catalogue', require('./routes/catalogue'))

// http 404 error handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
  })
})

module.exports = app
