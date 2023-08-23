const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()
const port = process.env.PORT || 4000
const mongodb = process.env.MONGO_LOGIN

const main = async () => {
    try {
        mongoose.connect(mongodb)
        console.log('mongo connected')
    } catch (err) {
        console.log(err)
    }
}

main()

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})