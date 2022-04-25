const express = require("express");
const {
  checkUser,
  searchOne,
  changePassword,
} = require("../services/auth-service");
const { getUserAlerts } = require("../services/alert-service");
const jwt = require("jsonwebtoken");
// import { search as searchPermissions } from "../services/permission-service";

const router = express.Router();

const loginHandler = async (req, res) => {
  if (req.body.username && req.body.password) {
    let user = await checkUser(req.body.username, req.body.password);
    if (user) {
      var token = jwt.sign(
        {
          id: user._id,
          username: req.body.username,
          exp: Math.floor(Date.now() / 1000) + 3600,
        },
        process.env.JWT_SECRET
      );
      const { passwordHash, ...rest } = user;

      let alerts = await getUserAlerts(user._id);

      const antdPayload = {
        status: "ok",
        type: "account",
        currentAuthority: rest.roleName,
        firstName: rest.firstName,
        lastName: rest.lastName,
        user: rest,
        accessToken: token,
        userInfo: {
          alerts: alerts,
        },
      };

      res.status(200).send(antdPayload);
      return;
    }
  }

  res.status(400).send("Invalid username or password xyz");
  return;
};

const forgotPasswordHandler = async (req, res) => {
  if (req.body.email) {
    const user = await searchOne({ email: req.body.email });
    if (user) {
      const newPassword = "a123"; // we will replace this and set from random string when we have the email service
      await changePassword(user, newPassword);
      res.status(200).send("Password changed successfully");
      return;
    }
  }

  res.status(400).send("Invalid email");
  return;
};

router.post("/login", loginHandler);
router.post("/forgotPassword", forgotPasswordHandler);

module.exports = router;
