'use strict'

const express = require('express')
const path = require('path')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const {setEnvironment} = require('./environment')
const checkRoute = require('./middleware/check-route')
const {startServer} = require('./server')
const {dbConnect} = require('./db')

/* NODE ENVIRONMENT */
const env = process.env.NODE_ENV
setEnvironment(env)

/* SERVER & PARAMETERS */
const app = express()
const port = process.env.PORT
const tls = process.env.TLS || 'no'

/* SECURITY */
app.use(helmet())

/* MISCELLANEOUS */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended': true}))

/* DATABASE */
dbConnect().catch((e) => {
  console.log(e.message)
  process.exit(1)
})

/* ROUTES */

// Routers
const adminRoute = require('./api-routes/admin')
const userRoute = require('./api-routes/user')
const authenticationRoute = require('./api-routes/authentication')
const logsRoute = require('./api-routes/logs')

// Server static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

// Admin API
app.use('/api/admin', adminRoute)

// User API
app.use('/api/user', userRoute)

// Doorlock authentication API
app.use('/api/authenticate', authenticationRoute)

// Logs API
app.use('/api/logs', logsRoute)

// Middleware to catch errors
app.use(checkRoute)

startServer(app, tls, port)

module.exports = {app}
