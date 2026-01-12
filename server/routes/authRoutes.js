const express = require('express')
const {createUser, login, logout, getUserData} = require('../controllers/authController.js')

const router = express.Router()

router.post('/createuser', createUser)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me',getUserData)

module.exports = router;