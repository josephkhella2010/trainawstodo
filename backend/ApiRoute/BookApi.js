const express = require("express");
const router = express.Router();
const {
  create,
  findAll,
  deleteBook,
  getBookById,
} = require("../schema/BookDymondb");

router.post("/api/addbook", async (req, res) => {
  const { title, description, price } = req.body;
  if (!title || !description || !price) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const book = await create({ title, description, price });
    return res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/api/books", async (req, res) => {
  try {
    const books = await findAll();
    return res.status(200).json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.delete("/api/deleteBook/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await deleteBook(id);

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.status(200).json({ sms: "sucessfully deleted" });
  } catch (error) {}
  console.error("Error fetching books:", error);
  return res.status(500).json({ error: "error while delete " });
});
router.get("/api/book/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await getBookById(id);
    return res.status(200).json({ book });
  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
