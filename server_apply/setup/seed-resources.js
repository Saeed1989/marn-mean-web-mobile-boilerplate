const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const { upsert } = require("../src/services/resource-service");

console.log("Seed starting");
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_resource}`;
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = () => {
  mongoose.connect(uri, options, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database connection established");
      fs.readFile("./setup/resources.json", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const resources = JSON.parse(data);
          resources.forEach(async (resource) => {
            const newresource = await upsert(resource);
            console.log(newresource);
          });
        }
      });
    }
  });
};

connectWithDb();
console.log(`Seed finished`);
