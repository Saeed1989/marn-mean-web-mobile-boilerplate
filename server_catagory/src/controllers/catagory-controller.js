/* eslint-disable no-undef */
const express = require("express");
const { getAll, getBySku } = require("../services/catagory-service");
const { NotFound } = require("../utils/errors");

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    console.log("user:", req.user);
    const items = await getAll();
    const result = {
      data: items,
      total: items.length,
      success: true,
    };
    res.status(200).send(result);
  } catch (error) {
    return next(error, req, res);
  }
};

const getBySkuHandler = async (req, res, next) => {
  try {
    const parentSku = req.params.catSku;
    const item = await getBySku(parentSku);
    if (item) {
      res.status(200).send(item);
    } else {
      throw new NotFound("Product not found by the id: " + parentSku);
    }
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/:catSku", getBySkuHandler);

router.get("/", getHandler);

module.exports = router;
