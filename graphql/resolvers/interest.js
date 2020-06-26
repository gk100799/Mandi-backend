const Interests = require('../../models/interests')

module.exports = {
    createInterests: (args) => {
        console.log(args.interest)
        const interests = new Interests({
            interest: args.interest
        });
        return interests.save()
            .then(result => {
                return { ...result._doc, _id: result.id }
            })
            .catch(err => {
                throw err
            })
    }
}