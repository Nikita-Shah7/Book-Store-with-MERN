import mongoose, { mongo } from "mongoose";


const AdminSchema = mongoose.Schema(
    {
        adminname: {
          type: String,
          required: [true, "Please add the user name"],
          unique: [true, "UserName already exists !!"],
        },
        password: {
          type: String,
          required: [true, "Please add the password"],
        },
    },
    {
    timestamps: true,
    }
)

export const Admin = mongoose.model("Admin",AdminSchema)