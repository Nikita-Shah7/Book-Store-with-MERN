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
        image: {
          data: Buffer,
          // default: "D:/Projects/MERN/BookStore/backend/images/cover_not_found.jpg",
          contentType: String
        }
    },
    {
    timestamps: true,
    }
)

export const Book = mongoose.model("Book",BookSchema)