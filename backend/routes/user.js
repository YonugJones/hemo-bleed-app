const express = require('express')
const { getUser, editUser } = require('../controllers/user')
const { authenticateToken } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/:username', authenticateToken, getUser)
router.put('/:username', authenticateToken, editUser)

module.exports = router