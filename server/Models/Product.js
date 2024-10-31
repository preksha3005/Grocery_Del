const mongoose = require("mongoose");
const Pschema = new mongoose.Schema(
  {
   url:{
    type:String,
    required:true
   },
   name:{
    type:String,
    required:true
   },
   price:{
    type:Number,
    required:true
   },
   desc:{
    type:String,
    required:true
   },
   category:{
    type:String,
    required:true,
    enum: ["Breads and buns", "Dairy","Fruits and Vegetables","Beverages","Snacks"] 
   },
   rating:{
    type:Number,
    default:0
   }
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", Pschema);
module.exports = Product;