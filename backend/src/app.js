import express, { urlencoded } from "express"
import {clerkMiddleware} from "@clerk/express"
import fileUpload from "express-fileupload"
import dotenv from "dotenv"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { connectDB } from "./db/db.js"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import adminRouter from "./routes/admin.routes.js"
import songRouter from "./routes/song.routes.js"
import albumRouter from "./routes/album.routes.js"
import statsRouter from "./routes/stats.routes.js"
import cors from "cors"
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

app.use(clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
}));
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Requests without an Origin header are allowed for health checks and CLI clients.
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.replace(/\/$/, "");
        if (allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true
}))
const PORT = process.env.PORT || 5000
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

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log("The server is up and running on PORT: ", PORT);
    });
};

startServer();
