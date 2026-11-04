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
// Keep the singular route as the canonical endpoint while accepting the
// plural form used by older frontend builds.
adminRouter.post(["/album", "/albums"], protectRoute, requireAdmin, createAlbum);
adminRouter.delete("/album/:id", protectRoute, requireAdmin, deleteAlbum);
adminRouter.get("/check", protectRoute, requireAdmin, checkAdmin);
export default adminRouter;
