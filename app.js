require("dotenv").config();

const express = require("express");
const { mongoDbConnect } = require("./mongodb/connect");
const bookRouter = require("./routes/book");
const { routeNotFound } = require("./utils/route-not-found-handler");
const { errorHandler } = require("./utils/error-handler");

const port = process.env.PORT || 3000;

const app = express();

let mongoDbClient;

(async () => {
  try {
    mongoDbClient = await mongoDbConnect(process.env.MONGO_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
})();

app.use((req, res, next) => {
  req.mongoDbClient = mongoDbClient;
  next();
});

app.use(express.json());

app.use("/api/v1/books", bookRouter);

app.use(routeNotFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
