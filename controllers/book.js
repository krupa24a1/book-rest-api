const { createCustomError } = require("../utils/custom-error-class");
const { asyncErrorHandler } = require("../utils/async-error-handler");
const { ObjectId } = require("mongodb");
const collectionName = "books";

const successResponseObject = {
  status: "success",
  message: "",
  data: {},
};

const createBook = asyncErrorHandler(async (req, res, next) => {
  const { title, author, summary } = req.body;
  const { mongoDbClient } = req;
  if (!(title && author && summary)) {
    return next(
      createCustomError("Missing title, author or summary properties", 400)
    );
  }
  const book = await mongoDbClient.collection(collectionName).insertOne({
    title,
    author,
    summary,
  });

  successResponseObject.message = "Book created successfully";
  successResponseObject.data = book;
  res.status(201).json(successResponseObject);
});

const getAllBooks = asyncErrorHandler(async (req, res) => {
  const { mongoDbClient } = req;
  const books = await mongoDbClient
    .collection(collectionName)
    .find({})
    .toArray();

  successResponseObject.message = "All books details"
  successResponseObject.data = books;
  res.status(200).json(successResponseObject);
});

const getBook = asyncErrorHandler(async (req, res, next) => {
  const { mongoDbClient } = req;
  const { id: bookId } = req.params;

  const book = await mongoDbClient
    .collection(collectionName)
    .findOne({ _id: new ObjectId(bookId) })

  if (!book) {
    return next(createCustomError(`Book doesn't exist for id: ${bookId}`, 404));
  }

  successResponseObject.message = "Single book details"
  successResponseObject.data = book;
  res.status(200).json(successResponseObject);
});

const updateBook = asyncErrorHandler(async (req, res, next) => {
  const { mongoDbClient } = req;
  const { id: bookId } = req.params;
  const { title, author, summary } = req.body;

  const updateObj = {};
  if (title) {
    updateObj.title = title;
  }
  if (author) {
    updateObj.author = author;
  }
  if (summary) {
    updateObj.summary = summary;
  }

  const updatedBook = await mongoDbClient
    .collection(collectionName)
    .findOneAndUpdate({ _id: new ObjectId(bookId) }, { $set: updateObj });

  if (!updatedBook) {
    return next(createCustomError(`Book doesn't exist for id: ${bookId}`, 404));
  }

  const book = await mongoDbClient
    .collection(collectionName)
    .findOne({ _id: new ObjectId(bookId) });
  successResponseObject.data = book;
  successResponseObject.message = "Book details updated successfully!";
  res.status(200).json(successResponseObject);
});

const deleteBook = asyncErrorHandler(async (req, res, next) => {
  const { mongoDbClient } = req;
  const { id: bookId } = req.params;

  const deletedBook = await mongoDbClient
    .collection(collectionName)
    .findOneAndDelete({ _id: new ObjectId(bookId) });

  if (!deletedBook) {
    return next(createCustomError(`Book doesn't exist for id: ${bookId}`, 404));
  }

  successResponseObject.data = deletedBook;
  successResponseObject.message = "Book deleted successfully!";
  res.status(200).json(successResponseObject);
});

module.exports = { createBook, getAllBooks, getBook, updateBook, deleteBook };
