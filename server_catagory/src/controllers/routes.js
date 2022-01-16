const express = require("express");
const catagoryRoutes = require("./catagory-controller");

let router = express.Router();

router.use("/catagories", catagoryRoutes);

module.exports = router;
