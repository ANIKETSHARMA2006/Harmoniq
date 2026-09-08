import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAlbums, getAllAlbums } from "../controller/album.controller.js";
const albumRouter= Router()

albumRouter.get("/", getAllAlbums);
albumRouter.get("/:albumId", getAlbums);

export default albumRouter;