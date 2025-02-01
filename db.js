import { MongoClient } from "mongodb";

let dbConnection;

export function connection(callback) {
  const db = new MongoClient("mongodb://localhost:27017/bookstore"); // can replace by MongoDB Atlas connection string
  return db
    .connect()
    .then((client) => {
      dbConnection = client.db();
      return callback();
    })
    .catch((err) => {
      console.log(err);
      return callback(err);
    });
}

export function getDB() {
  return dbConnection;
}
