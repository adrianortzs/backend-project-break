const express = require('express')
require('dotenv').config()
const routes = require('./routes/productRoutes')
const {dbConnection} = require('./config/db')

const app = express()
const PORT = process.env.PORT || 3000

dbConnection()

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/../public/images'))

app.use('/', routes)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))