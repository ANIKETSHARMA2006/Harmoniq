import { getAuth } from "@clerk/express";
import { User } from "../models/user.model.js";

const getAllUsers = async (req, res) => {
    try {
        const { userId: currentUserId } = getAuth(req);
        const users = await User.find({ clerkId: { $ne: currentUserId } });
        res.status(200).json(users);
    } catch (error) {
        console.log("Error at getAllUsers controller:", error);
        res.status(500).json({ message: error.message });
    }
}

export { getAllUsers }
