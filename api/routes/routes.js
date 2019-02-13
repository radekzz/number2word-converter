const express = require('express')
const converter = require('../controllers/converter')

const router = express()

router.post('/convert', converter.convert)

module.exports = router
