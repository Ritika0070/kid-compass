import { User } from "../models/user.model.js";

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.userId).select("name email childProfile");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({
      profile: {
        fullName: user.childProfile?.fullName || user.name || "",
        guardianEmail: user.childProfile?.guardianEmail || user.email || "",
        ...user.childProfile?.toObject?.(),
      },
    });
  } catch (err) {
    console.error("Get profile error:", err);
    return res.status(500).json({ message: "Could not load profile." });
  }
}

export async function saveProfile(req, res) {
  try {
    const allowedFields = [
      "fullName",
      "preferredName",
      "age",
      "gender",
      "grade",
      "school",
      "city",
      "language",
      "guardianName",
      "guardianRelation",
      "guardianEmail",
      "favoriteSubject",
      "favoriteActivity",
      "hobbies",
      "supportNote",
      "consent",
    ];

    const childProfile = {};

    for (const field of allowedFields) {
      if (field in req.body) childProfile[field] = req.body[field];
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { childProfile } },
      { new: true }
    ).select("childProfile");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({
      message: "Profile saved successfully.",
      profile: user.childProfile,
    });
  } catch (err) {
    console.error("Save profile error:", err);
    return res.status(500).json({ message: "Could not save profile." });
  }
}
