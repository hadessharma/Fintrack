const express = require("express");
const router = express.Router();
const { postExpenses } = require("../controllers/postControllers");

router.post("/", [], postExpenses);

module.exports = router;
