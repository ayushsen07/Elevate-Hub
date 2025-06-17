const express =  require('express')
const cors =  require('cors')
const cookieParser =require('cookie-parser')

const app = express()
require('./config/db')


const routes = require('./routes')
const config = require('./config')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(config.PREFIX, routes)
app.use(cookieParser())


module.exports =app