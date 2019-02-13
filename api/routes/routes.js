const express = require('express')
const converter = require('../controllers/converter')
const validate = require('../middleware/validate')

const router = express()

router.post('/convert', validate.isNumeric, converter.convert)

module.exports = router
