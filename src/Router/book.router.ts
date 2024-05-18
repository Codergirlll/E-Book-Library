


import express from "express"
import multer from "multer"
import path = require('node:path')

const Book_Router = express.Router()

import authentication from "../middleware/authentication"
import { book_Create, book_Update, All_Book, Single_Book } from "../controller/book.controller"


// ****************** for create multer ****************************
const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7 }
})


// ******************* For creating Book Lib ***********************
Book_Router.post(
    "/create",
    authentication,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "file", maxCount: 1 }
    ]),
    book_Create
)


// ******************* For updating Book Lib ***********************
Book_Router.patch(
    "/update/:BookID",
    authentication,
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "file", maxCount: 1 }
    ]),
    book_Update
)


// ******************* For all Books from Lib ***********************
Book_Router.get("/all", All_Book)

// ******************* For getting specific book from Lib ***********************
Book_Router.get("/:BookID", Single_Book)

// Book_Router.delete("/delete/:BookID", blogDelete)


export = Book_Router