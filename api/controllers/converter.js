const Converter = require('../models/Converter')

module.exports = {
    async convert (req, res) {
        try {
            const conversion = await Converter.convert(req.body.numericString)
            res.send({ words: conversion })
        } catch (error) {
            res.status(500).send({error})
        }
    }
}
