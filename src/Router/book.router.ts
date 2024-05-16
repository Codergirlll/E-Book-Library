


import express from "express"
const Book_Router = express.Router()

// const {
//     // blogCreate,
//     // blogUpdate,
//     // blogDelete,
//     // allBlog,
//     // blogById
// } = require("../controllers/blog.controller")

import { book_Create } from "../controller/book.controller"
Book_Router.post("/create", book_Create)
// Book_Router.put("/blog/update/:id", blogUpdate)
// Book_Router.delete("/blog/delete/:id", blogDelete)
// Book_Router.get("/blog/allblog", allBlog)
// Book_Router.get("/blog/blog.by.id/:id", auth, blogById)


export = Book_Router