const Expenses = require("../models/expensesModel");

const getExpenses = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await Expenses.findOne({ email: email });

    return res.status(200).json({ data: user, message: "Good request." });
  } catch (error) {
    return res.status(500).json({ error: "Internal error." });
  }
};

module.exports = { getExpenses };
