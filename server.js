const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const apiRoutes = require('./api/routes/routes')

const app = express()
const port = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// api routes
app.use('/api', apiRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app
