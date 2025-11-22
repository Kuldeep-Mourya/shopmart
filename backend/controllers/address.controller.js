import Address from "../model/address.model"
import User from "../model/user.model"

export const updateAddress=async(req, res)=>{
  try {
    const userId=req.user._id

    const {street,city,state,zip,country}=req.body

    if(!street||!city||!state||!zip||!country){
      return res.status(400).json({message:"Please fill all the fields"})
    }

    // find user
    const user=await User.findById(userId)

    if(!user){
      return res.status(400).json({message:"User not found"})
    }

    // update user
    const updateUser=await Address.findOneAndUpdate({
      user:user._id 
    },{
      $set:{
        street,
        city,
        state,
        zip,
        country
      }
    },{
      new:true
    }).select("-password")

    return res.status(200).json({message:"Address updated successfully", data:updateUser})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server Error"})   
  }
}