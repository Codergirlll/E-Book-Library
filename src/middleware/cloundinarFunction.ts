import createHttpError from "http-errors"
import cloudinary from "../config/cloudinary"
import { NextFunction } from "express"
import path from "node:path"
import fs from "fs"

const cloudinary_inserting = async (
    next: NextFunction,
    uploaded_Data: Express.Multer.File[]
) => {

    let folder
    try {
        folder = uploaded_Data[0].fieldname
        console.log("folder: ", folder)
        let File_Name = uploaded_Data[0].filename
        let Path = path.resolve(__dirname, "../../public/data/uploads", File_Name)
        let MimeType = uploaded_Data[0].mimetype.split('/').at(-1)

        let cover_update_result = await cloudinary.uploader.upload(
            Path,
            {
                filename_override: File_Name,
                folder: `Book-${folder}`,// "Book-Covers",
                format: MimeType
            }
        )

        let Current_secureURL = cover_update_result.secure_url

        // ************************ For deleting temperory files *******************
        await fs.promises.unlink(Path)

        return Current_secureURL
    }
    catch (error) {
        console.log("Error: ", error)
        const err = createHttpError(500, `Error in ${folder} file while Inserting in Cloudinary`)
        return next(err)
    }
}


const cloudinary_delete = async (
    next: NextFunction,
    URL: string
) => {

    let folder
    try {

        let url_split = URL.split('/')
        folder = url_split.at(-2)
        url_split = (url_split[url_split.length - 1]).split('.')
        let public_url = `${folder}/${url_split[0]}`
        console.log("public_url: ", public_url)

        await cloudinary.uploader.destroy(public_url)
    }
    catch (error) {
        console.log("Error: ", error)
        const err = createHttpError(500, `Error in ${folder} file while Deleting from Cloudinary`)
        return next(err)

    }
}

export {
    cloudinary_inserting,
    cloudinary_delete
}