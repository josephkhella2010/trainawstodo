const express = require("express");
const cors = require("cors");
const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());
const postBook = require("./ApiRoute/BookApi");
const getBook = require("./ApiRoute/BookApi");

app.use(postBook);
app.use(getBook);

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
