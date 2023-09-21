import express, { json } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoute.js";
import userRouter from "./routes/userRoute.js"
import cors from 'cors';

const app = express();

// middleware to parse request body
app.use(express.json())

// app.use( (req,res,next) => {
//     console.log(req.body)
//     // console.log(res)
// })


// middleware to handle CORS POLICY
// OPTION 1 :: Allow all Origins with default of cors(*)
app.use(cors())
// OPTION 2 :: Allow custom Origins
// app.use(cors({
//     origin: ['http://localhost:3000','http://localhost:5173'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))


// middleware to access routes
app.use("/books",booksRouter)
app.use("/user",userRouter)



app.get('/', (req, res) => {
    // console.log(req)
    return res.status(234).send("Welcome to MERN !!")
})


mongoose.connect(mongoDBURL).then(() => {
    console.log("App connected to database!!")
    // listen to PORT only if app is successfully connected to database
    app.listen(PORT, () => {
        console.log(`SERVER listening on PORT_NO = ${PORT}`)
    })
}).catch((error) => {
    console.log("ERROR MESSAGE ::", error)
})
