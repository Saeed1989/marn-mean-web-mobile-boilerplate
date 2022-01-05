const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const { upsert } = require("../src/services/user-service");

console.log("Seed starting");
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_USER}`;
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = () => {
  mongoose.connect(uri, options, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Database connection established");
      fs.readFile("./setup/users.json", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const users = JSON.parse(data);
          users.forEach(async (user) => {
            const newuser = await upsert(user);
            console.log(newuser);
          });
        }
      });
    }
  });
};

connectWithDb();
console.log(`Seed finished`);
