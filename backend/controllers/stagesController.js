const Stages = require('../models/stageModel')
const debug = require('debug')('where_are_they:stagesController')
const Targets = require('../models/targetModel')


exports.home_stages_get = async (req, res) => {
    try {
        const stages = await Stages.find().populate('targets')
        debug('stages', stages)
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