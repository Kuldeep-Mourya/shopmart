import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User'
 },
 product:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
  }
 ],
 totalPrice:{
  type:Number
 },
 status:{
  type:Stirng,
  enum:["Pending","Delivered", "Cancelled"],
  default:"Pending"
 }

})

export default mongoose.model('Order', orderSchema)