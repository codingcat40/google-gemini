const express = require('express')

const auth = require('../middlewares/auth')

const {SendAPIRequest, getMyData} = require('../controllers/homeController.js')


const router = express.Router()

router.post('/prompt', auth, SendAPIRequest)
router.get('/history', auth, getMyData)

module.exports = router