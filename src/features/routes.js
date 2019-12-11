const express = require('express')
const stationManager = require('./stations/routes')
const carManager = require('./cars/routes')
const routerManager = express()
routerManager.options('/*', (_, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  res.sendStatus(200)
})

routerManager.use(stationManager)
routerManager.use(carManager)
module.exports = routerManager