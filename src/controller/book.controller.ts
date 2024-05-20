
import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"

import Book_model from "../model/book.model";
import { AuthRequest } from "../middleware/authentication";
import { cloudinary_inserting, cloudinary_delete } from "../middleware/cloundinarFunction";



// ******************* For creating Book Lib ***********************
const book_Create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        let { title, description, genre } = req.body
        let { coverImage, file } = req.files as { [fieldname: string]: Express.Multer.File[] }


        // *********************** for uploading the cover page and deleting old one **********************
        let cover_url
        if (coverImage) {
            cover_url = await cloudinary_inserting(next, coverImage)
        }


        // *********************** for uploading the File and deleting old one **********************
        let file_URL
        if (file) {
            file_URL = await cloudinary_inserting(next, file)
        }


        // *********************** For taking author ****************************
        let _req = req as AuthRequest


        // ************************ Saving in DataBase *****************************
        let New_Book = await Book_model.create({
            title,
            description,
            genre,
            author: _req.userID,//"6645be31e5708c11c2957c73",
            coverImage: cover_url,
            file: file_URL
        })
        console.log(`Data store successfully`)

        res.status(201).json({
            message: `Data store successfully`,
            id: New_Book._id
        });
    }
    catch (error) {

        console.log("Error: ", error)
        const err = createHttpError(500, { error } || 'Error in uploading files')
        return next(err)
    }
}


// ******************* For updating Book Lib ***********************
const book_Update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        let { title, description, genre } = req.body
        let { BookID } = req.params
        let { coverImage, file } = req.files as { [fieldname: string]: Express.Multer.File[] }


        // Check if book is already exist or not
        let IsBookExist = await Book_model.findOne({ _id: BookID })
        if (!IsBookExist) {
            const err = createHttpError(404, `Book Not Found`)
            return next(err)
        }
        let {
            author,
            coverImage: old_coverImage,
            file: old_file
        } = IsBookExist

        // check if author is going to upadte same book or not
        let _req = req as AuthRequest
        let user_id = _req.userID
        let author_id = author.toString()

        if (user_id !== author_id) {
            const err = createHttpError(403, `You are not allowed to upadate another book`)
            return next(err)
        }


        // **************** For updating cover image *****************************
        let Update_Cover_URL
        if (coverImage) {
            Update_Cover_URL = await cloudinary_inserting(next, coverImage)
            await cloudinary_delete(next, old_coverImage)
        }


        // *********************For updating file *********************************
        let Update_File_URL
        if (file) {
            Update_File_URL = await cloudinary_inserting(next, file)
            await cloudinary_delete(next, old_file)
        }


        let update_Book = await Book_model.findOneAndUpdate(
            { _id: BookID },
            {
                title,
                description,
                genre,
                coverImage: Update_Cover_URL || old_coverImage,
                file: Update_File_URL || old_file
            },
            { new: false }
        )

        console.log(`Data Updated successfully`)

        res.status(201).json({
            message: `Book ID no. ${IsBookExist._id} is updated successfully`,
        });
    }
    catch (error) {
        console.log("Error: ", error)
        const err = createHttpError(500, { error } || 'Error in updating files')
        return next(err)
    }
}


// ******************* For Getting All Books in Lib ***********************
const All_Book = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        let all_books = await Book_model.find()

        res.status(200).json({
            message: `All Books Data`,
            totalBooks: all_books.length,
            books: all_books
        });
    }
    catch (error) {
        console.log("Error: ", error)
        const err = createHttpError(500, { error } || 'Error in getting all Books')
        return next(err)
    }
}


// ******************* For Getting specific Book in Lib ***********************
const Single_Book = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {


        let { BookID } = req.params

        let Book = await Book_model.findOne({ _id: BookID })
        if (!Book) {
            let err = createHttpError(404, ` Book ID no. ${BookID} is not found. `)
            return next(err)
        }

        res.status(200).json({
            message: `Specific Book Data`,
            book: Book
        });
    }
    catch (error) {
        console.log("Error: ", error)
        const err = createHttpError(500, { error } || 'Error in getting single Book')
        return next(err)
    }
}


// ******************* For deleting book from Lib *******************
const book_delete = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        let { BookID } = req.params

        let IsBookExist = await Book_model.findOne({ _id: BookID })
        if (!IsBookExist) {
            const err = createHttpError(404, `Book Not Found`)
            return next(err)
        }

        // check if author is going to delete same book or not
        let _req = req as AuthRequest
        let user_id = _req.userID
        let author_id = IsBookExist.author.toString()

        if (user_id !== author_id) {
            const err = createHttpError(403, `You are allowed to delete anothore book`)
            return next(err)
        }


        // For Deleting file from cloudinary
        let { coverImage, file } = IsBookExist
        await cloudinary_delete(next, coverImage)
        await cloudinary_delete(next, file)


        // For Deleting the book from DataBase
        await Book_model.findOneAndDelete({ _id: BookID })

        res.status(201).json({
            message: `Book ID no. ${BookID} delete successfully`,
        });


    }
    catch (error) {
        console.log("Error: ", error)
        const err = createHttpError(500, { error } || 'Error in Deleting Book')
        return next(err)
    }
}


export {
    book_Create,
    book_Update,
    All_Book,
    Single_Book,
    book_delete
}

