const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TargetSchema = new Schema({
    imgUrl: {
        type:String,
        required: true
    },
    name: {
        type:String,
        required: true
    },
    cordsX: {
        type: Number,
        required: true,
    },
    cordsY: {
        type:Number,
        required: true
    }
})

module.exports = mongoose.model('Target', TargetSchema)