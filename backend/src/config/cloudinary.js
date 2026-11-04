import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// This module is imported before app.js runs its dotenv setup, so load the
// backend environment explicitly instead of relying on the process cwd.
dotenv.config({
    path: path.resolve(__dirname, "../../.env")
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export default cloudinary;
