const Expenses = require("../models/expensesModel");

const postExpenses = async (req, res) => {
  try {
    const { email, desc, amount } = req.body;
    const user = await Expenses.findById(email);
    console.log(user);
  } catch (error) {
    console.log("post failed.");
  }
};

module.exports = { postExpenses };
