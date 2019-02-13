module.exports = {
    isNumeric (req, res, next) {
        const payload = req.body.numericString

        if (typeof payload !== 'string') {
            res.status(400).send({error: 'data submitted must be a string'})
        } else if (!/^[2-9]+$/.test(payload)) {
            res.status(400).send({error: 'data submitted must be a number from 2 to 9 corresponding to the T9 keyaboard'})
        } else {
            next()
        }
    }
}
