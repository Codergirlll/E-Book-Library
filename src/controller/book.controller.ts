
import { Request, Response, NextFunction } from "express"

// const Book_Logs = require("../models/blog.model")

// import Book_Logs
const book_Create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    // try {
    console.log("bookCreate")
    //     // console.log("request: ", req.body)

    //     let { title, description, author, state, body } = req.body


    //     let data = await Book_Logs.create({
    //         title, description, author, state, body
    //     })
    //     console.log("data: ", data)
    //     res.status(200).send({
    //         status: 0,
    //         message: "success",
    //         description: `Blog Created Successfully`,
    //         data: {
    //             _id: data._id,
    //             blog: data
    //         }
    //     })
    // }
    // catch (error) {

    //     res.status(400).send({
    //         status: 1,
    //         message: "failed",
    //         description: error.message
    //     })
    // }
}


// const book_Update = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {

//     try {
//         console.log("blogUpdate")
//         console.log("request: ", req.body)
//         console.log("id: ", req.params.id)


//         let { title, description, author, state, body } = req.body

//         let data = await BlogLogs.findOneAndUpdate(
//             { _id: req.params.id },
//             {
//                 title, description, author, state, body
//             },
//             { new: true }
//         )

//         res.status(200).send({
//             status: 0,
//             message: "success",
//             description: `Blog Updated Successfully`,
//             data: {
//                 _id: data._id,
//                 blog: data
//             }
//         })
//     }
//     catch (error) {

//         res.status(400).send({
//             status: 1,
//             message: "failed",
//             description: error.message
//         })
//     }
// }


// const book_Delete = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     console.log("blogById")

//     try {

//         let data = await BlogLogs.findOneAndDelete(
//             { _id: req.params.id }
//         )
//         res.status(200).send({
//             status: 0,
//             message: "success",
//             description: `Blog Delete successfully`,
//             data: {
//                 _id: data._id,
//                 blog: data
//             }

//         })
//     }
//     catch (error) {
//         res.status(400).send({
//             status: 1,
//             message: "failed",
//             description: error.message
//         })
//     }
// }


// const allBook = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     console.log("allBlog")
//     try {

//         let data = await BlogLogs.find()
//         res.status(200).send({
//             status: 0,
//             message: "success",
//             description: `All Bolgs`,
//             data: {
//                 tatalBlogs: data.length,
//                 blogs: data
//             }

//         })
//     }
//     catch (error) {

//         res.status(400).send({
//             status: 1,
//             message: "failed",
//             description: error.message
//         })
//     }
// }


// const book_ById = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     console.log("blogById")

//     try {

//         let data = await BlogLogs.findOne({ _id: req.params.id })

//         res.status(200).send({
//             status: 0,
//             message: "success",
//             description: `Getting Blog By Id`,
//             data: {
//                 _id: data._id,
//                 blog: data
//             }
//         })
//     }
//     catch (error) {

//         res.status(400).send({
//             status: 1,
//             message: "failed",
//             description: error.message
//         })
//     }
// }


export {
    book_Create,
    // book_Update,
    // book_Delete,
    // allBlog,
    // book_ById,
}

