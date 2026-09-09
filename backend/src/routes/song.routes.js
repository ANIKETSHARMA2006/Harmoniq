import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/songs.controller.js";
const songRouter=Router()
 
songRouter.get("/", getAllSongs);
songRouter.get("/featured", getFeaturedSongs);
songRouter.get("/made-for-you", getMadeForYouSongs);
songRouter.get("/trending", getTrendingSongs);
 
export default songRouter
