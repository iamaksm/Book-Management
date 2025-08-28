const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv =require('dotenv')
const Books = require('./Books');

app.use(express.json());
app.use(cors());
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
// MongoDB connection
(async () => {
    try {
        await mongoose.connect(MONGO_URI, {
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
})();

// Get all books
app.get('/books', async (req, res) => {
    try{
    const books = await Books.find();
    res.status(201).json(books);
}
catch(error){

    res.status(500).json({message:"Failed to fetch"})
}
});
//Access Books
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch", error: error.message });
  }
});

//Update Books
app.put("/books/:id", async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const updatedBook = await Books.findByIdAndUpdate(
      req.params.id,
      { title, author, year },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to update", error: error.message });
  }
});

//Delete books
app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Failed to delete" });
  }
});



// Add new book
app.post('/books', async (req, res) => {
    const { title, author, year } = req.body;
    const newBook = new Books({ title, author, year });
    await newBook.save();
    res.status(201).json(newBook);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:3001`));
