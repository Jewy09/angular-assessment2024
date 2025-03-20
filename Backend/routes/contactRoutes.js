import express from "express";
import Contact from "../models/contactModel.js";

const router = express.Router();

// GET all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST - Create a new contact
router.post("/", async (req, res) => {
  const { phone, email } = req.body;

  try {
    // Check if email or phone already exists
    // const existingEmail = await Contact.findOne({ email }).exec();
    // const existingPhone = await Contact.findOne({ phone }).exec();

    // if (existingEmail) {
    //   return res.status(400).json({ message: "Email already exists" });
    // }
    // if (existingPhone) {
    //   return res.status(400).json({ message: "Phone already exists" });
    // }

    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: "Error saving contact" });
  }
});

// PUT - Update a contact
router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.json(updatedContact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Remove a contact
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact)
      return res.status(404).json({ message: "Contact not found" });

    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact" });
  }
});

export default router;
