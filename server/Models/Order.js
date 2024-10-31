const mongoose = require("mongoose");
const Oschema = new mongoose.Schema(
  {
   user:{
    type:mongoose.Types.ObjectId,
    ref:'User'
   },
   product:{
    type:mongoose.Types.ObjectId,
    ref:'Product'
   },
   status:{
    type:String,
    default:"Order placed",
    enum:["Order placed","Out for delivery","Delivered","Canceled"]
   }
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", Oschema);
module.exports = Order;