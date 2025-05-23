const express = require('express')
const { getUser } = require('../controllers/user')
const { authenticateToken } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/:username', authenticateToken, getUser)

module.exports = router