const express = require("express");
const cors = require("cors");
const { SERVER_PORT, DB1 } = require("./config.js")
const pool = require("./db.js")
const booksRouter = require("./routes/booksRoute.js");
const userRouter = require("./routes/userRoute.js");
const adminRouter = require("./routes/adminRoute.js");

const app = express();

// middleware
app.use(cors())
app.use(express.json())

app.use("/books",booksRouter)
app.use("/user",userRouter)
app.use("/admin",adminRouter)


app.listen(SERVER_PORT, () => {
    console.log(`SERVER listening on PORT_NO = ${SERVER_PORT}`);
})


app.get('/', async (req, res) => {
    try {
        const createBookRelation = await pool.query("CREATE TABLE IF NOT EXISTS \"Book\"(_id SERIAL PRIMARY KEY, title VARCHAR NOT NULL, author VARCHAR NOT NULL, \"publishyear\" INT NOT NULL);")
        const createUserRelation = await pool.query("CREATE TABLE IF NOT EXISTS \"User\"(_id SERIAL PRIMARY KEY, username VARCHAR NOT NULL, \"password\" VARCHAR NOT NULL);")
        const createAdminRelation = await pool.query("CREATE TABLE IF NOT EXISTS \"Admin\"(_id SERIAL PRIMARY KEY, adminname VARCHAR NOT NULL, \"password\" VARCHAR NOT NULL);")
        return res.status(234).send("Welcome to PERN !!");        
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't connect to DB!!" })
    }
})