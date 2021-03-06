const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

const uri = process.env.DB_URI
mongoose.connect(uri, { useNewUrlParser: true })

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

//routes//////////////////////////////////// 
const customerRouter = require('./routes/customer.route')
const ownerRouter = require('./routes/owner.route')

app.use('/customer', customerRouter)
app.use('/owner', ownerRouter)
////////////////////////////////////////////


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
