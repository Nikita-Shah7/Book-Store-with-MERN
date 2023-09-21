import mongoose, { mongo } from "mongoose";


const UserSchema = mongoose.Schema(
    {
        username: {
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

export const User = mongoose.model("User",UserSchema)