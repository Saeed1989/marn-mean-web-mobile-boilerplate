const express = require("express");
const dataRoutes = require("./data-controller");
const permissionRoutes = require("./permission-controller");
const filterRoutes = require("./filter-controller");
//const authRoutes = require('./auth-controller');

let router = express.Router();

router.use("/data", dataRoutes);
router.use("/permissions", permissionRoutes);
router.use("/filters", filterRoutes);
//router.use("/auth", authRoutes);

module.exports = router;
