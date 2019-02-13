
module.exports = {
    convert (numericString) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('number passed: ' + numericString)
            }, 200)
        })
    }
}
