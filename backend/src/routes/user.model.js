// Correct model location is ../models/user.model.js.
export { User } from "../models/user.model.js";

/* Old misplaced model kept below for reference:
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  fullName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  clerkId: { type: String, required: true, unique: true },
}, { timestamps: true });
export const User = mongoose.model("User", userSchema);
*/
