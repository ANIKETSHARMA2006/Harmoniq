import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import adminRouter from "./routes/admin.routes.js"
import songRouter from "./routes/song.routes.js"
import albumRouter from "./routes/album.routes.js"
import statsRouter from "./routes/stats.routes.js"
const app = express()
dotenv.config({
    path: "./.env"
})
const PORT = process.env.PORT || 5000

app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/admin",adminRouter)
app.use("/api/song",songRouter)
app.use("/api/albums",albumRouter)
app.use("/api/stats",statsRouter)

app.listen(PORT,()=>{
    console.log("The server is up and running on PORT: ", PORT);
})