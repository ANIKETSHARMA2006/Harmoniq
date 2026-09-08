import { Album } from "../models/album.model.js"


const getAllAlbums = async(req,res)=>{
    try {
        const album = await Album.find();
        res.status(200).json(album)
    } catch (error) {
        console.log("error at getAllAlbum", error);
        res.status(500).send("Internal server error - can't find albums");
    }
}

const getAlbums = async(req,res)=>{
    try {
        const {albumId}= req.params
        const album = await Album.findById(albumId).populate("songs");
        if(!album){
            return res.status(404).json({message: "Album not found"})
        }
        res.status(200).json(album); 
    } catch (error) {
        console.log("Error at getAlbum", error);
        res.status(500).send("Internal server error")
    }
}

export {getAllAlbums,getAlbums}