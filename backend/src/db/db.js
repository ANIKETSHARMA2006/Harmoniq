import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("The db is connected");
    } catch (error) {
        console.log("MongoDb connection error : ", error);
        process.exit(1);
    }
}

export {connectDB}