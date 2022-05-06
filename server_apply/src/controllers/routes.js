const express = require("express");
const userRoutes = require("./user-controller");
const roleRoutes = require("./role-controller");
const categoryRoutes = require("./category-controller");
const dataRoutes = require("./data-controller");
const permissionRoutes = require("./permission-controller");
const authRoutes = require("./auth-controller");
const resourceRoutes = require('./resource-controller');

let router = express.Router();

router.use("/users", userRoutes);
router.use("/roles", roleRoutes);
router.use("/categories", categoryRoutes);
router.use("/data", dataRoutes);
router.use("/permissions", permissionRoutes);
router.use("/auth", authRoutes);
router.use("/resources", resourceRoutes);

module.exports = router;
