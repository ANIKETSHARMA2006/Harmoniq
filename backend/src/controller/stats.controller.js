import { Song} from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";
const getStats = async (req, res) => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtistsResult] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    const uniqueArtists = uniqueArtistsResult[0]?.count || 0;

    res.status(200).json({
      totalSongs,
      totalAlbums,
      totalUsers,
      uniqueArtists,
    });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ message: error.message });
  }
};

export default getStats;