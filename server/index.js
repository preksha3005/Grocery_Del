const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const { User, createU } = require("./Models/User");
const Product = require("./Models/Product");
const Order = require("./Models/Order");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); // middleware function in Express.js that enables the parsing of cookies in incoming requests.
mongoose.connect("mongodb://localhost:27017/Grocery-Delivery");

const verifyuser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ msg: "Please login to access this" });
  const decode = await jwt.verify(token, process.env.KEY);
  const authClaims = decode.authClaims;
  req.user = {
    name: authClaims[0].name,
    role: authClaims[1].role,
    id: authClaims[2].id,
  };
  console.log("Verified user:", req.user);
  next();
};

app.post("/sign", async (req, res) => {
  const { name, email, password, address } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  } else {
    if (password.length < 5) {
      return res.json({ message: "Password must be at least 5 characters" });
    }
    const hashpass = await bcrypt.hash(password, 10);
    try {
      const userData = {
        name: name,
        email: email,
        password: hashpass,
        address: address,
        // role: "user" // default role is "user"
      };
      const result = await createU(userData);
      if (result.message) {
        return res.json({ message: result.message });
      } else {
        return res.json({ status: true, message: "Account created" });
      }
    } catch (err) {
      return res.json({ message: err.message });
    }
  }
});
app.post("/loginapp", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });
  else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Wrong Password" });
    } else {
      const authClaims = [
        { name: user.name },
        { role: user.role },
        { id: user.id },
      ];
      const token = jwt.sign({ authClaims }, process.env.KEY, {
        expiresIn: "24h",
      });
      res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
      return res.json({
        status: true,
        message: "Login successful",
        id: user._id,
        role: user.role,
        // token: token,
      });
    }
  }
});

app.get("/getuser", verifyuser, async (req, res) => {
  const { id } = req.user;
  const detail = await User.findById(id);
  return res.json({
    message: "Details of user",
    detail,
    token: req.cookies.token,
  });
});

app.put("/updateAdd", verifyuser, async (req, res) => {
  const { id } = req.user;
  const { address } = req.body;
  await User.findByIdAndUpdate(id, { address: address });
  return res.json({ message: "Address updated successfully" });
});

app.post("/addprod", verifyuser, async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (user.role !== "admin") {
    return res.json({ message: "You do not have access" });
  }
  try {
    console.log(req.body);
    await Product.create({
      url: req.body.url,
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      category: req.body.category,
      rating: req.body.rating,
    });
    return res.json({ message: "Product added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error adding product", error });
  }
});

app.put("/updateprod/:id", verifyuser, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ message: "Invalid id type" });
  }
  try {
    await Product.findByIdAndUpdate(id, {
      url: req.body.url,
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      category: req.body.category,
      rating: req.body.rating,
    });
    return res.json({ message: "Product updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: `${err}` });
  }
});

app.delete("/deleteprod", verifyuser, async (req, res) => {
  const { prodid } = req.headers;
  await Product.findByIdAndDelete(prodid);
  return res.json({ message: "Product deleted successfully" });
});

app.get("/getallprod", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json({
      message: "Fetched products successfully",
      data: products,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching products", error: err });
  }
});

app.get("/getprod/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await Product.findById(id);
    if (!prod) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Product found", data: prod });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid product ID" });
  }
});

app.put("/addtocart", verifyuser, async (req, res) => {
  const { prodid, id } = req.headers;
  const userdata = await User.findById(id);
  if (!userdata) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!userdata.cart) {
    userdata.cart = [];
  }
  const index = userdata.cart.findIndex(
    (item) => item.prodid.toString() == prodid
  );
  if (index != -1) {
    userdata.cart[index].qty++;
  } else {
    userdata.cart.push({ prodid, qty: 1 });
  }
  await userdata.save();
  return res.json({ message: "Added to cart" });
});

app.delete("/deleteprod/:prodid", verifyuser, async (req, res) => {
  const { prodid } = req.params;
  const { id } = req.headers;
  const userdata = await User.findById(id);
  if (!userdata) {
    return res.status(404).json({ message: "User not found" });
  }
  const index = userdata.cart.findIndex(
    (item) => item.prodid.toString() == prodid
  );
  if (index == -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }
  if (userdata.cart[index].qty > 1) {
    userdata.cart[index].qty -= 1;
  } else {
    userdata.cart.pull({ prodid });
  }

  await userdata.save();
  return res.json({ message: "Product deleted from cart" });
});

app.post("/placeorder", verifyuser, async (req, res) => {
  const { id } = req.headers;
  const { order } = req.body;

  const userdata = await User.findById(id);
  if (!userdata) {
    return res.status(404).json({ message: "User  not found" });
  }

  try {
    for (const orderdata of order) {
      const newOrder = new Order({ user: id, product: orderdata.prodid });
      const ordernew = await newOrder.save();
      userdata.order.push(ordernew._id);
    }
    userdata.cart = [];
    await userdata.save();

    return res.json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Error placing order" });
  }
});

app.get("/getcartcount", verifyuser, async (req, res) => {
  const { id } = req.headers;
  const userdata = await User.findById(id);
  if (!userdata) {
    return res.status(404).json({ message: "User not found" });
  }
  let cartcount = 0;
  if (userdata.cart) {
    userdata.cart.forEach((item) => {
      cartcount += item.qty;
    });
  }
  return res.json({ data: cartcount });
});

app.get("/get-user-cart", verifyuser, async (req, res) => {
  const { id } = req.headers;
  if (!id) {
    return res.json({ message: "No id provided" });
  }
  // const userdata = await User.findById(id).populate("cart", null, Product);
  const userdata = await User.findById(id).populate("cart.prodid");
  const cart = userdata.cart.reverse();
  return res.json({ message: "success", data: cart });
});

app.get("/getorderhistory", verifyuser, async (req, res) => {
  const { id } = req.headers;
  const userdata = await User.findById(id).populate({
    path: "order",
    populate: { path: "product", model: "Product" },
  });
  const orderdata = userdata.order.reverse();
  res.json({ message: "Order history success", data: orderdata });
});

app.get("/getallorders", async (req, res) => {
  const orders = await Order.find()
    .populate({ path: "product", model: "Product" })
    .populate({ path: "user", model: "User" })
    .sort({ createdAt: -1 });
  return res.json({ data: orders });
});

app.get("/get-user-details/:id", verifyuser, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  return res.json(user);
});

app.put("/update-stat/:id", verifyuser, async (req, res) => {
  const { id } = req.params;
  await Order.findByIdAndUpdate(id, { status: req.body.status });
  return res.json({ message: "Status updated" });
});

app.post("/addprod",async(req,res)=>{
  const {id}=req.headers
  const user=await User.findById(id)
  if(user.role!='admin')
  {
    return res.json({message:"You do not have access"})
  }
  await Product.create({
    url:req.body.url,
    name:req.body.name,
    category:req.body.category,
    price:req.body.price,
    desc:req.body.desc,
    rating:req.body.rating
  })
  return res.json({ message: "Product added successfully" });
})

app.put("/updateprod/:id", verifyuser, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }
  await Product.findByIdAndUpdate(id, {
    url:req.body.url,
    name:req.body.name,
    category:req.body.category,
    price:req.body.price,
    desc:req.body.desc,
    rating:req.body.rating
  });
  return res.json({ message: "Product updated successfully" });
});

app.delete("/deleteprod", verifyuser, async (req, res) => {
  const { prodid } = req.headers;
  await Product.findByIdAndDelete(prodid);
  return res.json({ message: "Product deleted successfully" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
