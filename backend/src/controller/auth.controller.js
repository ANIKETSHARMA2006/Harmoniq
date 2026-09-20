
import { User } from "../models/user.model.js";

const authCallback = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);

        const { id, firstName, lastName, imageUrl } = req.body;

        if (!id || !firstName || !lastName || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Missing required user fields",
            });
        }

        console.log("Clerk ID:", id);

        // Check if user exists
        const existingUser = await User.findOne({ clerkId: id });

        console.log("Existing user:", existingUser);

        if (!existingUser) {
            const newUser = await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`.trim(),
                imageUrl,
            });

            console.log("Created user:", newUser);
        } else {
            console.log("User already exists");
        }

        res.status(200).json({
            success: true,
            message: "Auth callback successful",
        });

    } catch (error) {
        console.log("Error in auth callback:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export { authCallback };

