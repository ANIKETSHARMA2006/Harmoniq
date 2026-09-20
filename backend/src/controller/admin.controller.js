import {Song} from "../models/song.model.js"
import {Album} from "../models/album.model.js"
import cloudinary from "../config/cloudinary.js"

// healper function for cloudinary uploads
const uploadToCloudinary = async(file)=>{
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error in uploadtoCloudinary", error)
        throw new Error("Error uploading to Cloudinary");
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

    const song = await Song.findById(id)

    if(song.albumId){
        await Album.findByIdAndUpdate(song.albumId,{
            $pull: {songs: song._id}
        })
    }

    await song.findByIdAndDelete(id);

    res.status(200).json({message:"Song deleted successfully"});

 } catch (error) {
    console.log("error in deleteSong",error);
    res.status(500).send("Internal server error");
 }
}

const createAlbum = async(req,res,next)=>{
try {
    const {title,artist,releaseYear} = req.body
    const {imageFile}= req.files
    const imageUrl= await uploadToCloudinary(imageFile)

    const album = new Album({
        title,
        artist,
        imageUrl,
        releaseYear
    })
    await album.save()
    
} catch (error) {
    console.log("error in the createAlnum", error);
    res.status(500).send("internal server error");
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