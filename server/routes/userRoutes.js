const express = require('express')
const {createUser, login, logout} = require('../controllers/authController.js')

const router = express.Router()

router.post('/createuser', createUser)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router;