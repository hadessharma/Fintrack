const express = require("express");
const getRouter = require("./routes/getRoutes");
const connectDb = require("./config/dbConnect");

const app = express();
app.use(express.json());

connectDb();
app.use("/api/get", getRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("listening at port", port);
});
