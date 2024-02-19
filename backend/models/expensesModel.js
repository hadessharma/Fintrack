const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expensesSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    expenses: {
        type: Array,
        required: true,
        default: []
    }
  },
  { timestamps: true }
);

const Expenses = mongoose.model("Expenses",expensesSchema);

module.exports = Expenses;