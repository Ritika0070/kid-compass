import mongoose from "mongoose";

const childProfileSchema = new mongoose.Schema(
  {
    fullName: String,
    preferredName: String,
    age: String,
    gender: String,
    grade: String,
    school: String,
    city: String,
    language: String,
    guardianName: String,
    guardianRelation: String,
    guardianEmail: String,
    favoriteSubject: String,
    favoriteActivity: String,
    hobbies: String,
    supportNote: String,
    consent: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    childProfile: { type: childProfileSchema, default: {} },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
