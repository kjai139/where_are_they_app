const Stages = require('../models/stageModel')
const debug = require('debug')('where_are_they:stagesController')
const Targets = require('../models/targetModel')


exports.home_stages_get = async (req, res) => {
    try {
        const stages = await Stages.find().populate('targets')
        // debug('stages', stages)
        res.json({
            stages: stages
        })

    } catch(err) {
        debug(err)
        res.json({
            message: err
        })
    }
}

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