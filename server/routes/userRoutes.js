const express = require('express')
const {createUser, login} = require('../controllers/authController.js')

const router = express.Router()

router.post('/createuser', createUser)
router.post('/login', login)

module.exports = router;