import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:Stirng,
  },
  image:{
    type:Stirng,
  },
  role:{
    type:String,
    required:true,
    default:"Buyer",
    enum:["Seller","Buyer"]
  },
  cart:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Cart"
    }
  ],
  orders:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Order"
    }
  ],
  address:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Address"
  },
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
  },
  password:{
    type:String,
    required:true
  }
})

export default mongoose.model("User", userSchema)