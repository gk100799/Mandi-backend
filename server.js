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


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mandidb-sdbcm.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log("Server running at port 4000"));
  })
  .catch(err => {
    console.log(err);
  });

