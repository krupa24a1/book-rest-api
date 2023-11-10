const { MongoClient } = require("mongodb");
const dbName = "book-rest-api";

const mongoDbConnect = async (mongoUri) => {
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);
  return db;
};

module.exports = { mongoDbConnect };
