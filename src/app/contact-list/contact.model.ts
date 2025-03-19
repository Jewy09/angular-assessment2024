export interface Contact {
  id: string,
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
}
