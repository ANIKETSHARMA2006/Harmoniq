import { Router } from "express";
import { getAlbums, getAllAlbums } from "../controller/album.controller.js";
const albumRouter= Router()

albumRouter.get("/", getAllAlbums);
albumRouter.get("/:albumId", getAlbums);

export default albumRouter;
