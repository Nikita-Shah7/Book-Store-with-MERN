import express from "express"
import { Book } from "../models/book.js"

const booksRouter = express.Router()


// route to create a new book and save to database
booksRouter.post("/", async (req, res) => {
    try {
        // validating the input
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const createdBook = await Book.create(newBook)
        if (createdBook) {
            res.status(201).json({
                message: "Book created successfully !!",
                data: newBook
            })
        }

    } catch (error) {
        // console.log("Request body:", req.body);
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't create a new book!!" })
    }
})


// route to get all books from database
booksRouter.get("/", async (req, res) => {
    try {
        const allBooks = await Book.find()
        return res.status(200).json({
            message: "All books received !!",
            count: allBooks.length,
            data: allBooks
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all books!!" })
    }
})


// route to get One Book from DB by id
booksRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const oneBook = await Book.findById(id)
        return res.status(200).json({
            message: "Book received !!",
            data: oneBook
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the book!!" })
    }
})


// Route to update a Book
booksRouter.put("/:id", async (req,res) => {
    try {
        // validating the input
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updateBook = await Book.findByIdAndUpdate(id, req.body)

        if(!updateBook) {
            return res.status(404).json({message: "Book not found !!"})
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            data: updateBook
        })
    
    } catch(error) {
        console.log("ERROR MESSAGE ::",error.message)
        res.status(500).json({message: "Can't update !!"})
    }
})


// route to delete a Book
booksRouter.delete("/:id", async (req,res) => {
    try {
        const { id } = req.params
        const deleteBook = await Book.findByIdAndDelete(id)

        if(!deleteBook) {
            return res.status(404).json({message: "Book not found !!"})
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            data: deleteBook
        })
    
    } catch(error) {
        console.log("ERROR MESSAGE ::",error.message)
        res.status(500).json({message: "Can't Delete !!"})
    }
})


export default booksRouter;