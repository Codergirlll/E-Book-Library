
import { Request, Response, NextFunction } from "express"
import createHttpError from "http-errors"
import cloudinary from "../config/cloudinary"
import path from "node:path";
import Book_model from "../model/book.model";


const book_Create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {


    try {

        let { title, description, genre } = req.body as { [fieldname: string]: Express.Multer.File[] }
        let { coverImage, file } = req.files as { [fieldname: string]: Express.Multer.File[] }


        // *********************** for uploading the cover page **********************
        let Cover_Image_File_Name = coverImage[0].filename
        let Cover_Image_Path = path.resolve(__dirname, "../../public/data/uploads", Cover_Image_File_Name)
        let Cover_Image_MimeType = coverImage[0].mimetype.split('/').at(-1)

        const coverUploadResult = await cloudinary.uploader.upload(Cover_Image_Path, {
            filename_override: Cover_Image_File_Name,
            folder: "Book-Covers",
            format: Cover_Image_MimeType,
        });


        // *********************** for uploading the File **********************
        let File_File_Name = file[0].filename
        let File_Path = path.resolve(__dirname, "../../public/data/uploads", File_File_Name)
        let File_MimeType = file[0].mimetype.split('/').at(-1)

        const fileResult = await cloudinary.uploader.upload(File_Path, {
            filename_override: File_File_Name,
            folder: "Book-Covers",
            format: File_MimeType,
        });


        // ************************ Saving in DataBase *****************************
        let New_Book = await Book_model.create({
            title,
            description,
            genre,
            author: "6645be31e5708c11c2957c73",
            coverImage: coverUploadResult.secure_url,
            file: fileResult.secure_url
        })
        console.log(`Data store successfully`)

        res.status(201).json({
            message: `Data store successfully`,
            id: New_Book._id
        });
    }
    catch (error) {
        console.log("Error: ", error)
        const err = createHttpError(400, 'Error in uploading files')
        return next(err)

    }
}




export {
    book_Create,

}

