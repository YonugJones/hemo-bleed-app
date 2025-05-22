const express = require('express')
const { signup, login, refreshAccessToken } = require('../controllers/auth')
const { validateSignup } = require('../middleware/validateInput')
const router = express.Router()
/*
/auth
*/
router.post('/signup', validateSignup, signup)
router.post('/login', login)
router.post('/refresh', refreshAccessToken)

module.exports = router