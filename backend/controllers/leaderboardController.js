const Leaderboard = require('../models/leaderboardModel')

exports.leaderboard_check = async (req, res) => {
    try {

        const rankCount = await Leaderboard.countDocuments({
            time: {
                $lt: req.query.timer
            }
        })

        res.json({
            message:`received request to check time ${req.query.timer}, ${rankCount} entries ahead`,
            rank: rankCount
        })
    } catch (err) {
        res.json({
            message:err
        })
    }
}


exports.leaderboard_user_create = async (req, res) => {
    try {
        res.json({
            message: `received username: ${req.body.username} and timer ${req.body.timer}`
        })
    } catch (err) {
        res.json({
            message:err
        })
    }
}