import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    adminReply: {
      type: String,
      default: "",
    },

    repliedAt: Date,

    status: {
      type: String,
      enum: ["new", "replied"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);