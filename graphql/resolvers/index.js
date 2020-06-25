const authResolver = require('./auth')
const postResolver = require('./posts')

module.exports = {
    ...authResolver,
    ...postResolver
}