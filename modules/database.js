const { MongoClient } = require('mongodb');
const config = require('../config');

const mongo = new MongoClient(config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await mongo.connect();
    console.log('Successful connection to the database.');
  } catch (err) {
    console.error('An error occurred while connecting: ', err);
  }
}

connect();
const mail = mongo.db("modmail_bot")
const web = mongo.db("web_log")

module.exports = { mongo, mail, web }