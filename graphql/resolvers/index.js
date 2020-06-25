import authResolver from './auth'
import postResolver from './posts'

module.exports = {
    ...authResolver,
    ...postResolver
}