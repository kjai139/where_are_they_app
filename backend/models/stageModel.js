const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StageModelSchema = new Schema({
    name: {
        type:String,
        required: true,

    },
    stageUrl: {
        type:String,

    },
    targets:{
        type:[
            {
                type:Schema.ObjectId,
                ref: 'Target'
            }
        ],
        
    }
})

module.exports = mongoose.model('StageModel', StageModelSchema)