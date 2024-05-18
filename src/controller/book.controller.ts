
import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import path from "node:path";
import fs from "fs"

import cloudinary from "../config/cloudinary"
import Book_model from "../model/book.model";
import { AuthRequest } from "../middleware/authentication";



// ******************* For creating Book Lib ***********************
const book_Create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        let { title, description, genre } = req.body
        let { coverImage, file } = req.files as { [fieldname: string]: Express.Multer.File[] }


        // *********************** for uploading the cover page **********************
        let Cover_Image_File_Name = coverImage[0].filename
        let Cover_Image_Path = path.resolve(__dirname, "../../public/data/uploads", Cover_Image_File_Name)
        let Cover_Image_MimeType = coverImage[0].mimetype.split('/').at(-1)

        const coverUploadResult = await cloudinary.uploader.upload(
            Cover_Image_Path,
            {
                filename_override: Cover_Image_File_Name,
                folder: "Book-Covers",
                format: Cover_Image_MimeType,
            }
        );


        // *********************** for uploading the File **********************
        let File_File_Name = file[0].filename
        let File_Path = path.resolve(__dirname, "../../public/data/uploads", File_File_Name)
        let File_MimeType = file[0].mimetype.split('/').at(-1)

        const fileResult = await cloudinary.uploader.upload(
            File_Path,
            {
                filename_override: File_File_Name,
                folder: "Book-Files",
                format: File_MimeType,
            }
        );


        // *********************** For taking author ****************************
        let _req = req as AuthRequest


        // ************************ Saving in DataBase *****************************
        let New_Book = await Book_model.create({
            title,
            description,
            genre,
            author: _req.userID,//"6645be31e5708c11c2957c73",
            coverImage: coverUploadResult.secure_url,
            file: fileResult.secure_url
        })
        console.log(`Data store successfully`)


        // ************************ For deleting temperory files *******************
        try {
            await fs.promises.unlink(Cover_Image_Path)
            await fs.promises.unlink(File_Path)
        }
        catch (error) {
            return next(createHttpError(500, `Unable to delete the file`))
        }



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


        // check if author is going to upadte same book or not
        let _req = req as AuthRequest
        let user_id = _req.userID
        let author_id = IsBookExist.author.toString()

        if (user_id !== author_id) {
            const err = createHttpError(403, `You are allowed to upadate anothore book`)
            return next(err)
        }


        // **************** For updating cover image *****************************
        let cover_update_result, Update_Cover_URL

        if (coverImage) {
            let Update_Cover_Image_File_Name = coverImage[0].filename
            let Update_Cover_Image_Path = path.resolve(__dirname, "../../public/data/uploads", Update_Cover_Image_File_Name)
            let Update_Cover_Image_MimeType = coverImage[0].mimetype.split('/').at(-1)

            cover_update_result = await cloudinary.uploader.upload(
                Update_Cover_Image_Path,
                {
                    filename_override: Update_Cover_Image_File_Name,
                    folder: "Book-Covers",
                    format: Update_Cover_Image_MimeType
                }
            )

            Update_Cover_URL = cover_update_result.secure_url

            fs.promises.unlink(Update_Cover_Image_Path)
        }


        // *********************For updating file *********************************
        let Update_file, Update_File_URL

        if (file) {

            let Update_File_Name = file[0].filename
            let Update_File_Path = path.resolve(__dirname, "../../public/data/uploads", Update_File_Name)
            let Update_File_MimeType = file[0].mimetype.split('/').at(-1)


            Update_file = await cloudinary.uploader.upload(
                Update_File_Path,
                {
                    filename_override: Update_File_Name,
                    folder: "Book-Files",
                    format: Update_File_MimeType
                }
            )

            Update_File_URL = Update_file.secure_url

            fs.promises.unlink(Update_File_Path)
        }


        let update_Book = await Book_model.findOneAndUpdate(
            { _id: BookID },
            {
                title,
                description,
                genre,
                // coverImage: Update_Cover_URL ? Update_Cover_URL : IsBookExist.coverImage,
                coverImage: Update_Cover_URL || IsBookExist.coverImage,
                file: Update_File_URL || IsBookExist.file
            },
            { new: false }
        )

        console.log(`Data Updated successfully`)

        res.status(201).json({
            message: `Data Updated successfully`,
            // id: update_Book._id
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
        console.log("BookID: ", BookID)

        let Book = await Book_model.findOne({ _id: BookID })
        console.log("Book: ", Book)
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

export {
    book_Create,
    book_Update,
    All_Book,
    Single_Book
}

