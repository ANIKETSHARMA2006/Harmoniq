import {Song} from "../models/song.model.js"
import {Album} from "../models/album.model.js"
import cloudinary from "../config/cloudinary.js"
import mongoose from "mongoose"

const getErrorMessage = (error) => {
    if (typeof error === "string" && error) return error;
    if (error?.error?.message) return error.error.message;
    if (error?.message) return error.message;

    try {
        const serializedError = JSON.stringify(error);
        return serializedError && serializedError !== "{}"
            ? serializedError
            : "Internal server error";
    } catch {
        return "Internal server error";
    }
};

// healper function for cloudinary uploads
const uploadToCloudinary = async(file)=>{
    try {
        if (!file?.tempFilePath) {
            throw new Error("Uploaded image was not saved on the server");
        }

        const config = cloudinary.config();
        if (!config.cloud_name || !config.api_key || !config.api_secret) {
            throw new Error("Cloudinary is not configured on the server");
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type: "image",
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error uploading file to Cloudinary", error);
        throw error;
    }
}


const createSong =async(req,res,next)=>{
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({ message: "Please upload all files"});
        }
        const {title, artist,albumId,duration}= req.body
        const audioFile=req.files.audioFile
        const imageFile=req.files.imageFile

        const audioUrl= await uploadToCloudinary(audioFile)
        const imageUrl= await uploadToCloudinary(imageFile)

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            albumId: albumId || null,
        })
        await song.save()
        if(albumId){
            await Album.findByIdAndUpdate(albumId,{
                $push: {songs: song._id},
            });
        }
        res.status(201).json(song)
    } catch (error) {
        console.log("Error in createSong", error);
        res.status(500).json({ message: "Internal server error", error})
    }
}

const deleteSong = async(req,res,next)=>{
 try {
    const {id} = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid song ID" });
    }

    const song = await Song.findById(id)

    if (!song) {
        return res.status(404).json({ message: "Song not found" });
    }

    if(song.albumId){
        await Album.findByIdAndUpdate(song.albumId,{
            $pull: {songs: song._id}
        })
    }

    await Song.findByIdAndDelete(id);

    res.status(200).json({message:"Song deleted successfully"});

 } catch (error) {
    console.error("Error in deleteSong", error);
    res.status(500).json({
        message: error instanceof Error ? error.message : "Internal server error",
    });
 }
}

const createAlbum = async(req,res,next)=>{
let operation = "validating album data";
try {
    if (!req.files?.imageFile) {
        return res.status(400).json({ message: "Please upload an album image" });
    }

    const {title,artist,releaseYear} = req.body
    const parsedReleaseYear = Number(releaseYear)
    if (!title?.trim() || !artist?.trim() || !Number.isInteger(parsedReleaseYear)) {
        return res.status(400).json({ message: "Title, artist, and a valid release year are required" });
    }

    const {imageFile}= req.files
    operation = "uploading album artwork to Cloudinary";
    const imageUrl= await uploadToCloudinary(imageFile)

    operation = "saving album to MongoDB";
    const album = new Album({
        title,
        artist,
        imageUrl,
        releaseYear: parsedReleaseYear
    })
    await album.save()
    return res.status(201).json(album)
} catch (error) {
    const message = getErrorMessage(error);
    console.error(`Error in createAlbum while ${operation}:`, error);
    return res.status(500).json({
        message,
    });
}
}

const deleteAlbum = async(req,res,next)=>{
    try {
        const {id} = req.params;
        await Song.deleteMany({ albumId: id});
        await Album.findByIdAndDelete(id)
        res.status(200).json({message: "Album deleted Successfully"});
        
    } catch (error) {
        console.log("error in deleteAlbum",error);
        res.status(500).send("internal server error")
    }
}

const checkAdmin = async(req,res,next)=>{
    res.status(200).json({admin: true});
}

export {createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin}
