const dict = require('../dictionary/trieDictionary')

const t9 = [
    [' '], // 0
    [''], // 1
    ['a', 'b', 'c'], // 2
    ['d', 'e', 'f'], // 3
    ['g', 'h', 'i'], // 4
    ['j', 'k', 'l'], // 5
    ['m', 'n', 'o'], // 6
    ['p', 'q', 'r', 's'], // 7
    ['t', 'u', 'v'], // 8
    ['w', 'x', 'y', 'z'] // 9
]

function t9Words (digits, ret = []) {
    if (typeof digits === 'string') {
        digits = digits.split('').map(x => parseInt(x))
    }

    if (!digits.length) return ret.sort() // recursion bottom case
    if (!ret.length) return t9Words(digits.slice(1), t9[digits[0]]) // top case

    const nextRet = t9[digits[0]].reduce((m, x) =>
        m.concat(ret.map(word => word.concat(x))
        ), [])

    return t9Words(digits.slice(1), nextRet)
}

function findTrieWordInDict (dict) {
    return findTrieWord(word, dict)
}

// https://johnresig.com/blog/dictionary-lookups-in-javascript/
function findTrieWord (word, cur) {
    if (cur === 0) {
        return false
    }

    cur = cur || dict

    for (var node in cur) {
        if (word.indexOf(node) === 0) {
            var val = typeof cur[ node ] === 'number' && cur[ node ]
                ? dict.$[ cur[ node ] ]
                : cur[ node ]

            if (node.length === word.length) {
                return val === 0 || val.$ === 0
            } else {
                return findTrieWord(word.slice(node.length), val)
            }
        }
    }

    return false
};

const findTrieWordCurried = (dict) => (word) => findTrieWord(word, dict)

const filterDictForRealWords = findTrieWordCurried(dict)

module.exports = {
    convert (numericString) {
        return new Promise((resolve, reject) => {
            const results = t9Words(numericString)

            const realWords = results.filter(word => filterDictForRealWords(word))

            resolve(realWords)
        })
    }
}
