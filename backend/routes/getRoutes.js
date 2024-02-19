const express = require("express");
const router = express.Router();
const { getExpenses } = require("../controllers/getControllers");
router.get("/", [], getExpenses);

module.exports = router;
