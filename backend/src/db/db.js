import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from backend/.env");
        }
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        })
        console.log("The db is connected");
    } catch (error) {
        console.log("MongoDb connection error : ", error);
        process.exit(1);
    }
}

export {connectDB}
