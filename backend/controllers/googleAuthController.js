import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  try {
    // ✅ ADD THIS
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID Token missing" });
    }

    // ✅ Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub: googleId } = payload;

    // ✅ Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        profileImage: picture,
        role: "user",
      });
    }

    // ✅ Create JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      initials: user.initials,
    };

    return res.status(200).json({ token, user: safeUser });

  } catch (err) {
    console.error("Google Auth Error:", err);
    return res.status(401).json({ message: "Google authentication failed" });
  }
};
