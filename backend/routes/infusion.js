const express = require('express')
const { logInfusion } = require('../controllers/infusion')
const router = express.Router()
/*
/infusion
*/
router.post('/', logInfusion)

module.exports = router