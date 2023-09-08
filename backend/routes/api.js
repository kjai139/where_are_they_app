const express = require('express')
const { home_stages_get } = require('../controllers/stagesController')
const { map_stage_get } = require('../controllers/mapController')
const { targets_confirm_get } = require('../controllers/targetsController')
const { leaderboard_check, leaderboard_user_create, leaderboard_get } = require('../controllers/leaderboardController')
const router = express.Router()



router.get('/stages/get', home_stages_get)

router.get('/map/get', map_stage_get )

router.get('/targets/confirm', targets_confirm_get)

router.get('/leaderboard/check', leaderboard_check)

router.post('/leaderboards/create', leaderboard_user_create)

router.get('/leaderboard/get', leaderboard_get)

module.exports = router