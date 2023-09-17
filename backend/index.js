import express, { json } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/book.js";
import booksRouter from "./routes/booksRoute.js";

const app = express();

// middleware to parse request body
app.use(express.json())

// app.use( (req,res,next) => {
//     console.log(req.body)
//     // console.log(res)
// })

app.get('/', (req, res) => {
    // console.log(req)
    return res.status(234).send("Welcome to MERN !!")
})


app.use("/books",booksRouter)

mongoose.connect(mongoDBURL).then(() => {
    console.log("App connected to database!!")
    // listen to PORT only if app is successfully connected to database
    app.listen(PORT, () => {
        console.log(`SERVER listening on PORT_NO = ${PORT}`)
    })
}).catch((error) => {
    console.log("ERROR MESSAGE ::", error)
})
