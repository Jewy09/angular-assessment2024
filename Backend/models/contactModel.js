import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: String,
  email: { type: String, required: true, unique: true },
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  phone: { type: String, required: true },
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
