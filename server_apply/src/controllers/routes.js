const express = require("express");
const userRoutes = require("./user-controller");
const roleRoutes = require("./role-controller");
const catagoryRoutes = require("./catagory-controller");
const dataRoutes = require("./data-controller");
const permissionRoutes = require("./permission-controller");
const filterRoutes = require("./filter-controller");
const authRoutes = require("./auth-controller");

let router = express.Router();

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/catagories", catagoryRoutes);
router.use("/data", dataRoutes);
router.use("/permissions", permissionRoutes);
router.use("/filters", filterRoutes);
router.use("/auth", authRoutes);

module.exports = router;
