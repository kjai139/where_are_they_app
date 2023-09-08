const mongoose = require('mongoose')
const Schema = mongoose.Schema


const LeaderboardSchema = new Schema({
    time: {
        type: Number,
        required: true
    },
    name: {
        type:String,
        required:true
    },
    stage: {
        type:Schema.ObjectId,
        ref: 'StageModel'
    }
})


module.exports = mongoose.model('Leaderboard', LeaderboardSchema)