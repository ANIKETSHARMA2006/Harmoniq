import {Router} from 'express'
import { authCallback } from '../controller/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const authRouter = Router()

authRouter.post("/callback", protectRoute, authCallback)

export default authRouter
