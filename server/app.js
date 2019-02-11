const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
// cluster0-sgqbf.gcp.mongodb.net
// mongodb://ninja:test@cluster0-sgqbf.gcp.mongodb.net:27017/graphql-playlist
// mongodb://ninja:test@ds161148.mlab.com:61148/graphql-ninja?authSource=graphql-ninja&w=1
// const db = mongoose.connect('mongodb+srv://jeya:jeya@cluster0-sgqbf.gcp.mongodb.net:27017/graphql-playlist', {
const db = mongoose.connect('mongodb+srv://jeya:jeya@cluster0-sgqbf.gcp.mongodb.net/graphql-playlist', {
    useNewUrlParser: true
});
db.then(()=>{
    console.log('conneted to database');
}).catch((err)=>{
    console.error(err.message);
});

mongoose.connection.once('open', () => {
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
