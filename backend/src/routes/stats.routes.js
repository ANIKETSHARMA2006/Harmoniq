import { Router } from "express";
import getStats from "../controller/stats.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const statsRouter = Router();

statsRouter.get("/", protectRoute, requireAdmin, getStats);

export default statsRouter;
