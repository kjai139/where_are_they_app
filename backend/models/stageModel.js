const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StageModelSchema = new Schema({
    name: {
        type:String,
        required: true,

    },
    stageImg: {
        type:String,

    },
    targets:{
        type:[
            {
                type:Schema.ObjectId,
                ref: 'Targets'
            }
        ],
        required: true
    }
})

module.exports = mongoose.model('StageModel', StageModelSchema)