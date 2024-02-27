const express = require("express");
const { postExpenses } = require("../controllers/postControllers");
const router = express.Router();

router.post("/", [], postExpenses);

module.exports = router;
