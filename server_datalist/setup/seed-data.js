const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const { upsert } = require("../src/services/data-service");

console.log("Seed starting");
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = () => {
  mongoose.connect(uri, options, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database connection established");
      fs.readFile("./setup/data.json", (err, dataJson) => {
        if (err) {
          console.log(err);
        } else {
          const data = JSON.parse(dataJson);
          data.forEach(async (data) => {
            const newData = await upsert(data);
            console.log(newData);
          });
        }
      });
    }
  });
};

connectWithDb();
console.log(`Seed finished`);
