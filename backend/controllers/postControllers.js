const Expenses = require("../models/expensesModel");

const postExpenses = async (req, res) => {
  try {
    const { username, email, desc, amount } = req.body;
    const user = await Expenses.findOne({email:email});
    console.log(user);

    if (user) {
      const doc = await Expenses.findOneAndUpdate(
        { email: email },
        { $push: { expenses: { desc: desc, amount: amount } } }
      );
    } else {
      const newUser = new Expenses({
        username: username,
        email: email,
        expenses: [{ desc: desc, amount: amount }],
      });
      const doc = await newUser.save();
    }

    return res.status(201).json({ data: user, msg: "User found." });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ data: "", msg: "User NOT found." });
  }
};

module.exports = { postExpenses };
