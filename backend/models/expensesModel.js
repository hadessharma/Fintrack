const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const expenseShema = Schema({
//   desc: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
// });
const expensesSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    expenses: {
      type: [{}],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const Expenses = mongoose.model("Expenses", expensesSchema);

module.exports = Expenses;
