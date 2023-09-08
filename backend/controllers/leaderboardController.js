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

        const newEntry = new Leaderboard({
            name: req.body.username,
            time: req.body.timer,
            stage: req.body.mapId
        })

        await newEntry.save()
        res.json({
            message: `Saved username: ${req.body.username} and timer ${req.body.timer}`,
            success: true
        })
    } catch (err) {
        res.json({
            message:err
        })
    }
}

exports.leaderboard_get = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find({
            stage: req.query.id
        }).sort({ time: 1}).limit(10)

        res.json({
            leaderboard: leaderboard
        })

    } catch (err) {
        res.json({
            message:err
        })
    }
}