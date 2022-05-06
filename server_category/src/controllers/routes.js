const express = require("express");
const categoryRoutes = require("./category-controller");

let router = express.Router();

router.use("/categories", categoryRoutes);

module.exports = router;
