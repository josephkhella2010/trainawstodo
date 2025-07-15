/* // routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const { Book } = require("../schema/BookDymondb");

router.post("/api/addbook", async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const book = await Book.create({ title, description, price });
    return res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});
router.get("/api/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(201).json({ books });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
 */

const express = require("express");
const router = express.Router();
const { create, findAll } = require("../schema/BookDymondb");

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

module.exports = router;
