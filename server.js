require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//nodejs 의 native promise 사용 
mongoose.Promise = global.Promise


mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database~~~~~~~~~\n"))


const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const groupRouter = require('./routes/groups')
app.use('/groups', groupRouter)

const folderRouter = require('./routes/folders')
app.use('/folders', folderRouter)

app.listen(3000, () => console.log("Server Started!!!!!!!!!!!!!!!!!"))