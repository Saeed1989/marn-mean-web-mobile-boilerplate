const express = require("express");
const { search, getById } = require("../services/data-service");
const validators = require("../models/request-models");
const { NotFound } = require("../utils/errors");

const router = express.Router();

const getByIdHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await getById(id);
    if (item) {
      res.status(200).send(item);
    } else {
      throw new NotFound("Customer not found by the id: " + id);
    }
  } catch (error) {
    return next(error, req, res);
  }
};

const searchHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const items = await search(body);
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

router.get("/:id", getByIdHandler);
router.post("/search", searchHandler);

module.exports = router;
