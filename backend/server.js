const express = require("express");
const getRouter = require("./routes/getRoutes");
const postRouter = require("./routes/postRoutes");
const connectDb = require("./config/dbConnect");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

connectDb();
app.use("/api/get", getRouter);
app.use("/api/post", postRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("listening at port", port);
});
