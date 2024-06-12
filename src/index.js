const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const {dbConnection} = require('./config/db')
dbConnection()

//middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/../public/images'))

const routes = require('./routes/productRoutes')
app.use('/', routes)

const path = require('path')
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.listen(PORT, () => console.log(`Server running on ${PORT}`))