


import express from "express"
import multer from "multer"
import path = require('node:path')


const Book_Router = express.Router()

// const {
//     // blogCreate,
//     // blogUpdate,
//     // blogDelete,
//     // allBlog,
//     // blogById
// } = require("..ntrollers/blog.controller")

import { book_Create } from "../controller/book.controller"



// *************** for creation of book **************** */ 
const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 3e7 }
})

Book_Router.post(
    "/create",
    upload.fields([
        { name: "coverImage", maxCount: 1 },
        { name: "file", maxCount: 1 }
    ]),
    book_Create
)

// Book_Router.put("/blog/update/:id", blogUpdate)
// Book_Router.delete("/blog/delete/:id", blogDelete)
// Book_Router.get("/blog/allblog", allBlog)
// Book_Router.get("/blog/blog.by.id/:id", auth, blogById)


export = Book_Router