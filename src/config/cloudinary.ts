
import { v2 as cloudinary } from "cloudinary";
import configs from "./config";

cloudinary.config({
    cloud_name: configs.cloud_name,
    api_key: configs.api_key,
    api_secret: configs.api_secret
});

export default cloudinary 