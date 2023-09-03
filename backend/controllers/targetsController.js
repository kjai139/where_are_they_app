
const debug = require('debug')('where_are_they:targetsController')
const Targets = require('../models/targetModel')


exports.targets_confirm_get = async (req, res) => {

    
    
    try {

        
        res.json({
            message:`received ${req.query.id} X:${req.query.cordX} Y:${req.query.cordY}`
        })
    } catch (err) {
        res.json({
            message:err
        })
    }
}