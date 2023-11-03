const express = require("express");
const pool = require("../db.js")

const booksRouter = express.Router();


booksRouter.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const newBook = await pool.query("INSERT INTO \"Book\"(title,author,\"publishYear\") VALUES($1,$2,$3)",
            [req.body.title, req.body.author, req.body.publishYear]);
        res.status(201).json({
            message: "Book created successfully !!",
            // data: newBook
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message);
        res.status(500).json({ message: "Can't create a new book!!" });
    }
});

// get books according to pagination
booksRouter.get("/", async (req, res) => {
    try {
        let { page, limit, title, author } = req.query;
        title = title ? `${title}%` : '%'; // sanitize the input
        author = author ? `${author}%` : '%'; // sanitize the input
        // console.log(title,author, typeof title)
        let booksCount = await pool.query('SELECT COUNT(*) FROM \"Book\" WHERE author ILIKE $1 OR title ILIKE $2',[author,title]);
        booksCount = booksCount.rows[0].count;
        if (page < 1)
            page = 1;
        if (page > Math.ceil(booksCount / limit))
            page = Math.ceil(booksCount / limit);
        let startIndex = (page - 1) * limit;
        let endIndex = Math.min(page * limit - 1, booksCount - 1);
        console.log(startIndex, endIndex)
        // const paginatedBooks = await pool.query(`SELECT*FROM \"Book\" LIMIT ${limit} OFFSET ${startIndex}`);
        const paginatedBooks = await pool.query('SELECT*FROM \"Book\" WHERE author ILIKE $1 OR title ILIKE $2 LIMIT $3 OFFSET $4',[author,title,limit,startIndex]);
        return res.status(200).json({
            message: "All paginatedBooks received !!",
            count: paginatedBooks.rows.length,
            data: paginatedBooks.rows
        });
        // const allBooks = await pool.query(`SELECT*FROM \"Book\" WHERE author ILIKE \'${author}\'`);
        // return res.status(200).json({
        //     message: "All books received !!",
        //     count: allBooks.rows.length,
        //     data: allBooks.rows
        // });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all books!!" })
    }
});


booksRouter.get("/getBookCount", async (req, res) => {
    let { title, author } = req.query;
    title = title ? `${title}%` : '%'; // sanitize the input
    author = author ? `${author}%` : '%'; // sanitize the input
    try {
        // const booksCount = await pool.query("SELECT COUNT(*) FROM \"Book\"");
        const booksCount = await pool.query('SELECT COUNT(*) FROM \"Book\" WHERE author ILIKE $1 OR title ILIKE $2',[author,title]);
        return res.status(200).json({
            message: "BooksCount received !!",
            data: booksCount.rows[0].count
        });
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all books!!" })        
    }
});


booksRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const oneBook = await pool.query("SELECT * FROM \"Book\" WHERE _id = $1", [id]);
        // console.log(oneBook.rows)
        if (!oneBook.rows[0]) {
            return res.status(404).json({ message: "Book not found !!" })
        }
        return res.status(200).json({
            message: "Book received !!",
            data: oneBook.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get the book!!" })
    }
});


booksRouter.put("/:id", async (req, res) => {
    try {
        // validating the input
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updateBook = await pool.query("UPDATE \"Book\" SET title = $1, author = $2, \"publishYear\" = $3 WHERE _id = $4;", [req.body.title, req.body.author, req.body.publishYear, id]);

        if (updateBook.rowCount == 0) {
            return res.status(404).json({ message: "Book not found !!" })
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateBook
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't update !!" })
    }
});


booksRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteBook = await pool.query("DELETE FROM \"Book\" WHERE _id = $1;", [id]);
        if (deleteBook.rowCount == 0) {
            return res.status(404).json({ message: "Book not found !!" });
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteBook
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't delete!!" })
    }
});


module.exports = booksRouter;