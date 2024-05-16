
import mongoose from "mongoose";
import { User } from "../interface/user.interface";

const user_Schema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            require: true

        },
        email: {
            type: String,
            unique: true,
            require: true
        },
        password: {
            type: String,
            require: true
        }
    },
    { timestamps: true }
)

const user_model = mongoose.model<User>("user", user_Schema)

export default user_model
