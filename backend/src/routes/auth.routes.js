import {Router} from 'express'

const authRouter = Router()

authRouter.get("/",(req,res)=>{
    res.send("tandoori nights")
})

export default authRouter