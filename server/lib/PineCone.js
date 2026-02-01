const {Pinecone} = require('@pinecone-database/pinecone');
require('dotenv').config();


const pinecone = new  Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
})


const index = pinecone.Index(process.env.PINECONE_INDEX)

module.exports =  {index};
