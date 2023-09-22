import express from "express"
import { Admin } from "../models/Admin.js"
import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_SECRET } from '../config.js'

const adminRouter = express.Router()


// route to create a new Admin and save to database
adminRouter.post("/", async (req, res) => {
    try {
        // console.log(req.body)
        // validating the input
        if (!req.body.adminname || !req.body.password) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        // Check if the adminname already exists
        const existingAdmin = await Admin.findOne({ adminname: req.body.adminname });
        if (existingAdmin) {
            return res.status(409).json({ message: "adminname already exists" });
        }
        const newAdmin = {
            adminname: req.body.adminname,
            password: req.body.password,
        }
        const createdAdmin = await Admin.create(newAdmin)
        if (createdAdmin) {
            res.status(201).json({
                message: "Admin created successfully !!",
                data: newAdmin
            })
        }

    } catch (error) {
        // console.log("Request body:", req.body);
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't create a new admin!!" })
    }
})


// route to get all Admins from database
adminRouter.get("/", async (req, res) => {
    try {
        const allAdmins = await Admin.find()
        return res.status(200).json({
            message: "All admins received !!",
            count: allAdmins.length,
            data: allAdmins
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Can't get all admins!!" })
    }
})


// route to get One Admin from DB by AdminNamehere
// here, admin will be provided with accessToken
adminRouter.get("/:adminname", async (req, res) => {
    try {
        const { adminname } = req.params
        // const oneAdmin = await Admin.findById(id)
        const oneAdmin = await Admin.findOne({adminname: adminname})
        if(oneAdmin) {
             // Convert the Mongoose document to a plain JavaScript object
             const payLoad = oneAdmin.toObject();
            const accessToken = jwt.sign(payLoad, ACCESS_TOKEN_SECRET)
            return res.status(200).json({
                message: "Admin received !!",
                data: oneAdmin,
                accessToken: accessToken
            })
        }
        else res.status(500).json({ message: "Admin doesn't exists !!" })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        res.status(500).json({ message: "Admin doesn't exists !!" })
    }
})

export default adminRouter;