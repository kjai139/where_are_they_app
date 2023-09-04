
const debug = require('debug')('where_are_they:targetsController')
const Targets = require('../models/targetModel')


exports.targets_confirm_get = async (req, res) => {

    
    
    try {
        const theTarget = await Targets.findById(req.query.id)
        debug(theTarget)
        if (Math.abs(req.query.cordX - theTarget.cordsX) <= theTarget.xRange && Math.abs(req.query.cordY - theTarget.cordsY) <= theTarget.yRange
        ) {
            debug('target hit')
            res.json({
                found:true,
                message:`received ${req.query.id} X:${req.query.cordX} Y:${req.query.cordY}`
            })
        } else {
            res.json({
                found:false
            })
        }
        
        
        
    } catch (err) {
        res.json({
            message:err
        })
    }
}