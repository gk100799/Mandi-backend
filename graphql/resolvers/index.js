const authResolver = require('./auth')
const postResolver = require('./posts')
const interestResolver = require('./interest')

module.exports = {
    ...authResolver,
    ...postResolver,
    ...interestResolver,
}