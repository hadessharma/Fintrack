const getExpenses = (req, res) => {
  try {
    return res.status(200).json({ data: "data", msg: "output." });
  } catch (error) {
    return res.status(500).json({ error: "Internal error." });
  }
};

module.exports = { getExpenses };
