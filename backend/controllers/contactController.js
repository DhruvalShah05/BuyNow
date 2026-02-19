import Contact from "../models/Contact.js";


// ===============================
// CREATE MESSAGE (Login Optional)
// ===============================
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({
      user: req.user?._id || null,
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ===============================
// ADMIN - GET ALL MESSAGES
// ===============================
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ===============================
// ADMIN - REPLY TO MESSAGE
// ===============================
export const replyToContact = async (req, res) => {
  try {
    const { reply } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    contact.adminReply = reply;
    contact.status = "replied";
    contact.repliedAt = new Date();

    await contact.save();

    res.json({
      message: "Reply sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ===============================
// USER - GET MY MESSAGES
// ===============================
export const getMyContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ===============================
// ADMIN - DELETE MESSAGE
// ===============================
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Message not found" });
    }

    await contact.deleteOne();

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};