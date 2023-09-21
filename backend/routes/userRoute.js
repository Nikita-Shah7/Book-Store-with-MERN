import express from "express"
import { User } from "../models/user.js"

const userRouter = express.Router()


// route to create a new User and save to database
userRouter.post("/", async (req, res) => {
    try {
        // console.log(req.body)
        // validating the input
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        // Check if the username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }
        const newUser = {
            username: req.body.username,
            password: req.body.password,
        }
        const createdUser = await User.create(newUser)
        if (createdUser) {
            res.status(201).json({
                message: "User created successfully !!",
                data: newUser
            })
        }

    } catch (error) {
        // console.log("Request body:", req.body);
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't create a new user!!" })
    }
})


// route to get all Users from database
userRouter.get("/", async (req, res) => {
    try {
        const allUsers = await User.find()
        return res.status(200).json({
            message: "All users received !!",
            count: allUsers.length,
            data: allUsers
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all users!!" })
    }
})


// route to get One User from DB by Username
userRouter.get("/:username", async (req, res) => {
    try {
        const { username } = req.params
        // const oneUser = await User.findById(id)
        const oneUser = await User.findOne({username: username})
        if(oneUser) {
            return res.status(200).json({
                message: "User received !!",
                data: oneUser
            })
        }
        else res.status(500).json({ message: "User doesn't exists !!" })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "User doesn't exists !!" })
    }
})


// Route to update a User
userRouter.put("/:id", async (req,res) => {
    try {
        // validating the input
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { id } = req.params
        const updateUser = await User.findByIdAndUpdate(id, req.body)

        if(!updateUser) {
            return res.status(404).json({message: "User not found !!"})
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            data: updateUser
        })
    
    } catch(error) {
        console.log("ERROR MESSAGE ::",error.message)
        res.status(500).json({message: "Can't update !!"})
    }
})


// route to delete a User
userRouter.delete("/:id", async (req,res) => {
    try {
        const { id } = req.params
        const deleteUser = await User.findByIdAndDelete(id)

        if(!deleteUser) {
            return res.status(404).json({message: "User not found !!"})
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            data: deleteUser
        })
    
    } catch(error) {
        console.log("ERROR MESSAGE ::",error.message)
        res.status(500).json({message: "Can't Delete !!"})
    }
})


export default userRouter;