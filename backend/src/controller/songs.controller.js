import {Song} from "../models/song.model.js";
const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.status(200).json(songs);
    } catch (error) {
        console.log("Internal server error");
        res.status(500).json({ message: error.message });
    }
}

const getFeaturedSongs = async (req, res) => {
       try {
       const songs = await Song.aggregate([
        { $sample: { size: 6 } },
        {
            $project: {
                _id: 1,
                title: 1,
                artist:1,
                imageUrl: 1,
                audioUrl: 1,
            },
        }
      ]);
      
      res.status(200).json(songs);
    } catch (error) {
        console.log("Internal server error");
        res.status(500).json({ message: error.message });
    }
}

const getMadeForYouSongs = async (req, res) => {
    try {
       const songs = await Song.aggregate([
        { $sample: { size: 4} },
        {
            $project: {
                _id: 1,
                title: 1,
                artist:1,
                imageUrl: 1,
                audioUrl: 1,
            },
        }
      ]);
      
      res.status(200).json(songs);
    } catch (error) {
        console.log("Internal server error");
        res.status(500).json({ message: error.message });
    }
}

const getTrendingSongs = async (req, res) => {
    try {
       const songs = await Song.aggregate([
        { $sample: { size: 4 } },
        {
            $project: {
                _id: 1,
                title: 1,
                artist:1,
                imageUrl: 1,
                audioUrl: 1,
            },
        }
      ]);
      
      res.status(200).json(songs);
    } catch (error) {
        console.log("Internal server error");
        res.status(500).json({ message: error.message });
    }
}

export { getAllSongs, getFeaturedSongs , getMadeForYouSongs, getTrendingSongs};