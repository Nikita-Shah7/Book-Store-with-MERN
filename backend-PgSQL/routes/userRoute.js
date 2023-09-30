const express = require("express");
const pool = require("../db.js")

const userRouter = express.Router()


// route to create a new User and save to database
userRouter.post("/", async (req, res) => {
    try {
        // validating the input
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        // Check if the username already exists
        const existingUser = await pool.query("SELECT*FROM \"User\" WHERE username = $1;",[req.body.username]);
        if (existingUser.rowCount!=0) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const newUser = {
            username: req.body.username,
            password: req.body.password,
        }
        const createdUser = await pool.query("INSERT INTO \"User\"(username,password) VALUES($1,$2);",[req.body.username,req.body.password]);
        if (createdUser.rowCount==1) {
            return res.status(201).json({
                message: "User created successfully !!",
                // data: newUser
            })
        }

    } catch (error) {
        // console.log("Request body:", req.body);
        console.log("ERROR MESSAGE ::", error.message)
        return res.status(500).json({ message: "Can't create a new user!!" })
    }
})


// route to get all Users from database
userRouter.get("/", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT*FROM \"User\";");
        return res.status(200).json({
            message: "All users received !!",
            count: allUsers.rows.length,
            data: allUsers.rows
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        return res.status(500).json({ message: "Can't get all users!!" })
    }
})


// route to get One User from DB by Username
userRouter.get("/:username", async (req, res) => {
    try {
        const { username } = req.params
        // const oneUser = await User.findById(id)
        const oneUser = await pool.query("SELECT*FROM \"User\" WHERE username = $1",[username]);
        if(!oneUser.rows[0])
        {
            return res.status(500).json({ message: "User doesn't exists !!" })
        }
        return res.status(200).json({
            message: "User received !!",
            data: oneUser.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        return res.status(500).json({ message: "User doesn't exists !!" })
    }
})


// Route to update a User
userRouter.put("/:username", async (req,res) => {
    try {
        // validating the input
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { username } = req.params
        const updateUser = await pool.query("UPDATE \"User\" SET username = $1, \"password\" = $2 WHERE username = $3;",[req.body.username,req.body.password,username]);
        if(updateUser.rowCount==0) {
            return res.status(404).json({message: "User not found !!"})
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateUser
        })
    
    } catch(error) {
        console.log("ERROR MESSAGE ::",error.message)
        return res.status(500).json({message: "Can't update !!"})
    }
})


// route to delete a User
userRouter.delete("/:username", async (req,res) => {
    try {
        const { username } = req.params
        const deleteUser = await pool.query("DELETE FROM \"User\" WHERE username = $1;",[username]);

        if(deleteUser.rowCount==0) {
            return res.status(404).json({message: "User not found !!"})
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteUser
        })
    
    } catch(error) {
        console.log("ERROR MESSAGE ::",error.message)
        return res.status(500).json({message: "Can't Delete !!"})
    }
})


module.exports = userRouter;