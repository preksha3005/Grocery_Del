const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  address: { type: String, required: true },
  cart: {
    type: [
      {
        prodid: { type: mongoose.Types.ObjectId, ref: "Product" },
        qty: { type: Number, default: 0 },
      },
    ],
    default: [],
  },
  order: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
    // qty: { type: Number, default: 0 },
    default: [],
  },
});
const User = mongoose.model("User", UserSchema);
async function createU(data, req, res) {
  if (data.name.toLowerCase() == "admin") {
    const adminexist = await User.findOne({ role: "admin" });
    if (adminexist) {
      return res.json({ message: "Admin already exists" });
    } else {
      data.role = "admin";
    }
  } else {
    data.role = "user";
  }
  data.cart = [];
  data.order = [];
  try {
    const usercreate = await User.create(data);
    return usercreate;
  } catch (err) {
    return res.json({ message: err.message });
  }
}

module.exports = { User, createU };
