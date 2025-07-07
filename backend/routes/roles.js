const express = require("express");

const { createRole } = require("../controllers/roles");

const roleRouter = express.Router();

roleRouter.post("/", createRole);

module.exports = roleRouter;
