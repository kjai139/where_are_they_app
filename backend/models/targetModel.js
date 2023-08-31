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
       
    },
    cordsY: {
        type:Number,
        
    },
    xRange: {
        type:Number
    },
    yRange: {
        type:Number
    }
})

module.exports = mongoose.model('Target', TargetSchema)