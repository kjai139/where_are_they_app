const express = require('express')
const { home_stages_get } = require('../controllers/stagesController')
const router = express.Router()



router.get('/stages/get', home_stages_get)

module.exports = router