const fs = require('fs')
const path = require('path')

const tested = fs.readFileSync(path.resolve(__dirname, './../../mdApi.json'), 'utf8')

fs.writeFile(path.resolve(__dirname, './tested.json'), tested, {flag: 'w+'}, function (err) {
    if (err) {
        throw err
    }
})
