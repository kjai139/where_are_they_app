const Stages = require('../models/stageModel')
const debug = require('debug')('where_are_they:mapController')
const Targets = require('../models/targetModel')


exports.map_stage_get = async (req, res) => {
    try {
        const map = await Stages.find({ name: req.query.name }).populate('targets')

        res.json({
            stage: map
        })

    } catch (err) {
        debug(err)
        res.json({
            message: err
        })

    }
}