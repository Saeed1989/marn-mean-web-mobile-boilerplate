const express = require("express");
const catagoryRoutes = require("./catagory-controller");
const healthRoutes = require("./permission-controller");

let router = express.Router();

router.use("/catagories", catagoryRoutes);
router.use("/health", healthRoutes);

module.exports = router;
