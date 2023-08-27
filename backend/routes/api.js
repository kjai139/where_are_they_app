const express = require('express')
const { home_stages_get, map_stage_get } = require('../controllers/stagesController')
const router = express.Router()



router.get('/stages/get', home_stages_get)

router.get('/map/get', map_stage_get)

module.exports = router