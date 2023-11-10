const router = require("express").Router();
const {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/book");

router.route("/").post(createBook).get(getAllBooks);

router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

module.exports = router;
