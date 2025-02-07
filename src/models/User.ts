import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  facebookId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  profilePicture: String,
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", UserSchema);
