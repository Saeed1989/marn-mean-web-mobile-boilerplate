const express = require("express");
const { save, update, deleteById } = require("../services/catagory-service");
const validators = require("../models/request-models");
const { handleValidation } = require("../middlewares");
const { NotFound } = require("../utils/errors");

const router = express.Router();

const postHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const id = await save(body);
    res.status(201).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const id = await update(body);
    res.status(200).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(200).send("Catagory deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

router.post("/", postHandler);
router.put("/:id", putHandler);
router.delete("/:id", deleteHandler);

module.exports = router;
