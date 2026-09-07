import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers } from "../controller/user.controller.js";
const userRouter = Router()

userRouter.get("/", protectRoute, getAllUsers);

export default userRouter