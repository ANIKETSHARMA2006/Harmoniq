import "dotenv/config"
import express, { urlencoded } from "express"
import {clerkMiddleware} from "@clerk/express"
import fileUpload from "express-fileupload"
import path from "node:path"
import { connectDB } from "./db/db.js"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import adminRouter from "./routes/admin.routes.js"
import songRouter from "./routes/song.routes.js"
import albumRouter from "./routes/album.routes.js"
import statsRouter from "./routes/stats.routes.js"
import cors from "cors"
const app = express()
// Old code called dotenv.config() here, after imported modules had already loaded.
app.use(clerkMiddleware());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
const PORT = process.env.PORT || 5000
const __dirname = path.resolve();
app.use(express.json());
app.use(urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname,"temp"),
    createParentPath: true,
    limits:{
        fileSize: 10*1024*1024
    },
}))

app.use("/api/users",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/admin",adminRouter)
app.use("/api/song",songRouter)
app.use("/api/albums",albumRouter)
app.use("/api/stats",statsRouter)

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log("The server is up and running on PORT: ", PORT);
    });
};

startServer();
