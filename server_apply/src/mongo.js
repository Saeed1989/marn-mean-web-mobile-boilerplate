const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_USER}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = () => {
  mongoose.connect(uri, options, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database connection established");
    }
  });
};

const uriCatagory = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_CATAGORY}`;
const connectWithCatagoryDb = () => {
  let db = mongoose.createConnection(uriCatagory, options);
  db.on("error", function (error) {
    console.log(
      `MongoDB-Catagory :: connection ${this.name} ${JSON.stringify(error)}`
    );
    db.close().catch(() =>
      console.log(
        `MongoDB-Catagory  :: failed to close connection ${this.name}`
      )
    );
  });

  db.on("connected", function () {
    mongoose.set("debug", function (col, method, query, doc) {
      console.log(
        `MongoDB-Catagory :: ${
          this.conn.name
        } ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`
      );
    });
    console.log(`MongoDB-Catagory :: connected ${this.name}`);
  });

  db.on("disconnected", function () {
    console.log(`MongoDB-Catagory :: disconnected ${this.name}`);
  });
  return db;
};

const uriData = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_DATA}`;
const connectWithDataDb = () => {
  let db = mongoose.createConnection(uriData, options);
  db.on("error", function (error) {
    console.log(
      `MongoDB-Data :: connection ${this.name} ${JSON.stringify(error)}`
    );
    db.close().catch(() =>
      console.log(`MongoDB-Data  :: failed to close connection ${this.name}`)
    );
  });

  db.on("connected", function () {
    mongoose.set("debug", function (col, method, query, doc) {
      console.log(
        `MongoDB-Data :: ${this.conn.name} ${col}.${method}(${JSON.stringify(
          query
        )},${JSON.stringify(doc)})`
      );
    });
    console.log(`MongoDB-Data :: connected ${this.name}`);
  });

  db.on("disconnected", function () {
    console.log(`MongoDB-Data :: disconnected ${this.name}`);
  });
  return db;
};

module.exports = { connectWithDb, connectWithCatagoryDb, connectWithDataDb };
