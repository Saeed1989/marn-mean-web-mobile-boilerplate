const express = require("express");
const {
  getAll,
  save,
  update,
  deleteById,
  getById,
  search,
} = require("../services/role-service");
const validators = require("../models/request-models");
const {
  handleValidation,
  logRequest,
  checkAuthentication,
  checkPermission,
} = require("../middlewares");
const { NotFound } = require("../utils/errors");

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    const items = await getAll();
    res.status(200).send(items);
  } catch (error) {
    return next(error, req, res);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await getById(id);
    if (item) {
      res.status(200).send(item);
    } else {
      throw new NotFound("Role not found by the id: " + id);
    }
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const id = await save(body);
    res.status(201).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const searchHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await search(body);
    res.status(200).send(result);
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
    res.status(200).send("Role deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

const addReourceName = async (req, res, next) => {
  req.resourceName = "role-edit";
  next();
};

const commonMiddleware = [
  addReourceName,
  logRequest,
  checkAuthentication,
  checkPermission,
];

router.get("/:id", logRequest, getByIdHandler);
router.post(
  "/",
  commonMiddleware,
  handleValidation(validators.roleSchemaValidate),
  postHandler
);
router.put("/:id", commonMiddleware, putHandler);
router.get("/", logRequest, getHandler);
router.delete("/:id", commonMiddleware, deleteHandler);

module.exports = router;
