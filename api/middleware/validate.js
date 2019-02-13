module.exports = {
    isNumeric (req, res, next) {
        const payload = req.body.numericString

        if (typeof payload !== 'string') {
            res.status(401).send({error: 'data submitted must be a string'})
        } else if (!/^[0-9]+$/.test(payload)) {
            res.status(401).send({error: 'data submitted must be a number string'})
        } else {
            next()
        }
    }
}
