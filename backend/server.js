const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const apiRouter = require('./routes/api')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 4000
const mongodb = process.env.MONGO_LOGIN
const allowedOrigins = ['http://localhost:3000', 'https://where-are-they-app.vercel.app/']

const main = async () => {
    try {
        mongoose.connect(mongodb)
        console.log('mongo connected')
    } catch (err) {
        console.log(err)
    }
}

main()
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))

app.use(express.json())
app.use('/api', apiRouter)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})