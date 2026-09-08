import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";
const adminRouter = Router();

adminRouter.post("/songs", protectRoute, requireAdmin, createSong);
adminRouter.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);
adminRouter.post("/album", protectRoute, requireAdmin, createAlbum);
adminRouter.delete("/album/:id", protectRoute, requireAdmin, deleteAlbum);
adminRouter.get("/check", protectRoute, requireAdmin, checkAdmin);
export default adminRouter;
