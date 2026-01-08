const express = require('express')
const {createUser} = require('../controllers/userController.js')
const {login} =  require('../controllers/userController.js')

const router = express.Router()

router.post('/createuser', createUser)
router.post('/login', login)

module.exports = router;