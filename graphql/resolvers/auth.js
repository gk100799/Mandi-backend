const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')

const { transformResponse } = require('./resolverHelper')
const User = require('../../models/user')

module.exports = {
    createUser: args => {
        return User.findOne({ username: args.userInput.username })
            .then(user => {
                if (user) {
                    throw new Error('User exists already.');
                }
                return bcrypt.hash(args.userInput.password, 12);
            })
            .then(hashedPassword => {
                const user = new User({
                    username: args.userInput.username,
                    password: hashedPassword,
                    firstname: args.userInput.firstname,
                    lastname: args.userInput.lastname,
                    email: args.userInput.email,
                });
                return user.save();
            })
            .then(result => {
                return transformResponse(result);
            })
            .catch(err => {
                throw err;
            });
    },

    login: async ({ username, password }) => {
        const user = await User.findOne({ username: username });
        if (!user) {
            throw new Error('User doesn\'t exist');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect');
        }
        const token = jwt.sign({ userId: user.id, username: user.username }, 'this-is-a-secretkey', { expiresIn: '1h' });
        return { userId: user.id, token: token, tokenExpiration: 1 }
    }
};