const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const graphqlSchema =require('./graphql/schema/index')
const graphqlResolvers =require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const port = process.env.PORT || 3000
const app = express();

app.use(isAuth);

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true,
}));


mongoose.connect(`mongodb+srv://gopal:123@mandidb-sdbcm.mongodb.net/mandi_db?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log("Server running at port 4000"));
  })
  .catch(err => {
    console.log(err);
  });

