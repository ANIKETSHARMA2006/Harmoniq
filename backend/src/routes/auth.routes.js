import {Router} from 'express'
import { authCallback } from '../controller/auth.controller.js'

const authRouter = Router()

authRouter.get("/callback",authCallback)

export default authRouter