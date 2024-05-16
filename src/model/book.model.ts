
import mongoose from "mongoose";
import { Book } from "../interface/book.interface";

// type: mongoose.Schema.Types.ObjectId,
//     // add ref
//     ref: "User",
const Book_Schema = new mongoose.Schema<Book>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
            required: true
        },
        file: {
            type: String,
            required: true
        }

    },
    { timestamps: true }
)

const Book_model = mongoose.model<Book>("Book", Book_Schema)

export default Book_model

