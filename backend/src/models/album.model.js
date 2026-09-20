import mongoose, { Schema } from "mongoose";

const albumSchema = new Schema(
  {
    tital: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear:{
        type: Number,
        required: true
    },
    songs: [{
            type: Schema.Types.ObjectId,
            ref: "Song"
        }],
  },
  { timestamps: true },
);

export const Album = mongoose.model("Album",albumSchema);