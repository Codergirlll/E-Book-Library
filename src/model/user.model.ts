
import { timeStamp } from "console";
import mongoose from "mongoose";

const user_Schema = new mongoose.Schema(
    {

    name: {
            type: String,
        require:true
        
    },
    email:{
        type: String,
        unique: true,
        require:true
    },
    password:{
        type: String,
        require:true
    }
    },
    { timestamps: true }
)

const user_model = mongoose.model("user", user_Schema)

export default user_model
