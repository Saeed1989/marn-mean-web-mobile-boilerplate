const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const { upsert } = require("../src/services/role-service");

console.log("Seed starting");
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_role}`;
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = () => {
  mongoose.connect(uri, options, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database connection established");
      fs.readFile("./setup/roles.json", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const roles = JSON.parse(data);
          roles.forEach(async (role) => {
            const newrole = await upsert(role);
            console.log(newrole);
          });
        }
      });
    }
  });
};

connectWithDb();
console.log(`Seed finished`);
