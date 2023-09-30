const express = require("express");
const pool = require("../db.js")

const adminRouter = express.Router()


// route to create a new Admin and save to database
adminRouter.post("/", async (req, res) => {
    try {
        // validating the input
        if (!req.body.adminname || !req.body.password) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        // Check if the adminname already exists
        const existingAdmin = await pool.query("SELECT*FROM \"Admin\" WHERE adminname = $1;",[req.body.adminname]);
        if (existingAdmin.rowCount!=0) {
            return res.status(409).json({ message: "Adminname already exists" });
        }
        const newAdmin = {
            adminname: req.body.adminname,
            password: req.body.password,
        }
        const createdAdmin = await pool.query("INSERT INTO \"Admin\"(adminname,password) VALUES($1,$2);",[req.body.adminname,req.body.password]);
        if (createdAdmin.rowCount==1) {
            return res.status(201).json({
                message: "Admin created successfully !!",
                // data: newAdmin
            })
        }

    } catch (error) {
        // console.log("Request body:", req.body);
        console.log("ERROR MESSAGE ::", error.message)
        return res.status(500).json({ message: "Can't create a new admin!!" })
    }
})


// route to get all Admins from database
adminRouter.get("/", async (req, res) => {
    try {
        const allAdmins = await pool.query("SELECT*FROM \"Admin\";");
        return res.status(200).json({
            message: "All admins received !!",
            count: allAdmins.rows.length,
            data: allAdmins.rows
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        return res.status(500).json({ message: "Can't get all admins!!" })
    }
})


// route to get One Admin from DB by Adminname
adminRouter.get("/:adminname", async (req, res) => {
    try {
        const { adminname } = req.params
        // const oneAdmin = await Admin.findById(id)
        const oneAdmin = await pool.query("SELECT*FROM \"Admin\" WHERE adminname = $1",[adminname]);
        if(!oneAdmin.rows[0])
        {
            return res.status(500).json({ message: "Admin doesn't exists !!" })
        }
        return res.status(200).json({
            message: "Admin received !!",
            data: oneAdmin.rows[0]
        })
    } catch (error) {
        console.log("ERROR MESSAGE ::", error.message)
        return res.status(500).json({ message: "Admin doesn't exists !!" })
    }
})


// Route to update a Admin
adminRouter.put("/:adminname", async (req,res) => {
    try {
        // validating the input
        if (!req.body.adminname || !req.body.password) {
            return res.status(400).json({ message: "All fields are mandatory !!" })
        }
        const { adminname } = req.params
        const updateAdmin = await pool.query("UPDATE \"Admin\" SET adminname = $1, \"password\" = $2 WHERE adminname = $3;",[req.body.adminname,req.body.password,adminname]);
        if(updateAdmin.rowCount==0) {
            return res.status(404).json({message: "Admin not found !!"})
        }
        return res.status(200).json({
            message: "Updated successfully !!",
            // data: updateAdmin
        })
    
    } catch(error) {
        console.log("ERROR MESSAGE ::",error.message)
        return res.status(500).json({message: "Can't update !!"})
    }
})


// route to delete a Admin
adminRouter.delete("/:adminname", async (req,res) => {
    try {
        const { adminname } = req.params
        const deleteAdmin = await pool.query("DELETE FROM \"Admin\" WHERE adminname = $1;",[adminname]);

        if(deleteAdmin.rowCount==0) {
            return res.status(404).json({message: "Admin not found !!"})
        }
        return res.status(200).json({
            message: "Deleted successfully !!",
            // data: deleteAdmin
        })
    
    } catch(error) {
        console.log("ERROR MESSAGE ::",error.message)
        return res.status(500).json({message: "Can't Delete !!"})
    }
})


module.exports = adminRouter;