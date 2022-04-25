const mongoose = require("mongoose");
require("dotenv").config();

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = (uri, dbName) => {
  let db = mongoose.createConnection(uri, options);
  db.on("error", function (error) {
    console.log(
      `MongoDB-${dbName} :: connection ${this.name} ${JSON.stringify(error)}`
    );
    db.close().catch(() =>
      console.log(
        `MongoDB-${dbName}  :: failed to close connection ${this.name}`
      )
    );
  });

  db.on("connected", function () {
    mongoose.set("debug", function (col, method, query, doc) {
      console.log(
        `MongoDB-${dbName} :: ${
          this.conn.name
        } ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`
      );
    });
    console.log(`MongoDB-${dbName} :: connected ${this.name}`);
  });

  db.on("disconnected", function () {
    console.log(`MongoDB-${dbName} :: disconnected ${this.name}`);
  });
  return db;
};

const uriCatagory = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_CATAGORY}`;
const connectWithCatagoryDb = () => {
  return connectWithDb(uriCatagory, "Catagory");
};

const uriData = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_DATA}`;
const connectWithDataDb = () => {
  return connectWithDb(uriData, "Data");
};

const uriUser = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_USER}`;
connectWithUserDb = () => {
  return connectWithDb(uriUser, "User")
};

const uriAlert = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_ALERT}`;
connectWithAlertDb = () => {
  return connectWithDb(uriAlert, "Alert")
};

module.exports = { connectWithCatagoryDb, connectWithDataDb, connectWithUserDb, connectWithAlertDb};
