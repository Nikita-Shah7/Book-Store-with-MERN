import mongoose, { mongo } from "mongoose";


const BookSchema = mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
        },
        author: {
          type: String,
          required: true,
        },
        publishYear: {
          type: Number,
          required: true,
        },
    },
    {
    timestamps: true,
    }
)

export const Book = mongoose.model("Book",BookSchema)