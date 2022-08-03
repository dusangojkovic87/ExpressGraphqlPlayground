const express = require("express");
const {graphqlHTTP} = require("express-graphql");
require("dotenv").config();
const schema = require("./Schema/schema");


const app = express();
const PORT = process.env.PORT || 3000;


app.use("/graphql",graphqlHTTP({
    schema:schema,
    graphiql:true
}));

app.listen(PORT,() =>{
    console.log(`server listening on ${PORT} `);
})