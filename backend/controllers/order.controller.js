import Product from './model/product.model'
import Order from './model/order.model'
import User from './model/user.model'
import Admin from './model/admin.model'

//Create a new order
export const createOrder=async(req, res)=>{
  try {
    const userId=req.user._id
    const products=req.body.products

    if(!products){
      return res.status(400).json({message:"Please provide products"})
    }

    const user=await User.findById(userId)

    if(!user){
      return res.status(400).josn({message:"User not found"})
    }

    const newOrder=await Order.create({
      user:userId,
      products:products,
      totalPrice:products.reduce((acc,curr)=>acc+curr.price,0),
      status:"Pending"
    })

    res.status(201).json({message:"Order created successfully"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})    
  }
}


//get all order
export const getAllOrders=async(req, res)=>{
 try {
  const allOrders=await Order.find().populate("user").populate("products");

  if(!allOrders){
    return res.status(400).json({message:"Oder not found",orders:allOrders})
  }

  return res.status(200).json({message:"Orders fetched successfully"})
 } catch (error) {
  console.log(error);
  return res.status(500).json({message:"Internal server error"})  
 }
}

//get single order
export const singleOrder=async(req, res)=>{
  try {
    const orderId=req.params._id

    if(!orderId){
      return res.status(400).json({message:"Please provide an order id"})
    }

    const order=await Order.findById(orderId).populate('user').populate('products')

    if(!order){
      return res.status(400).josn({message:"Order not found"})
    }

    return res.status(200).json({message:"Order fetched successfully",order:order})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
  }
}


//update an order
export const updateOrder=async()=>{
  try {
    const orderId=req.params.id
    const status=req.body.status

    if(!orderId){
      return res.status(400).json({message:"Please provide an orderId"})
    }

    if(!status){
      res.status(400).json({message:"Please provide an status"})
    }

    // const order=await Order.findById(orderId)

    // if(!order){
    //   return res.status(400).josn({message:"Order not found"})
    // }

    const updatedOrder=await Order.findByIdAndUpdate(orderId,{
      status:status
    })

    if(!updatedOrder){
      return res.status(400).json({message:"Order not updated"})
    }

    return res.status(200).json({message:"Order updated succesfully",order:updateOrder})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
  }
}

//cancel an order
export const cancelOrder=async(req,res)=>{
try {
  const orderId=req.params.id

  if(!orderId){
    return res.status(400).json({message:"Please provide and order id"})
  }

  const order=await Order.findById(orderId)

  if(!order){
    return res.status(400).json({message:"Order not found"})
  }

  const updatedOrder=await Order.findByIdAndUpdate(orderId,{
    status:"Cancelled"
  })

  if(!updatedOrder){
    return res.status(400).json({message:"Order not updated"})
  }

  res.status(200).json({message:"Order cancelled succesfully"})
} catch (error) {
   console.log(error);
   return res.status(500).json({message:"Internal server error"})
}
}