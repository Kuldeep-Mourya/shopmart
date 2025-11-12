import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register=async(req, res)=>{
  try {
    const {name, email, role, password}=req.body
    if(!name||!email||!password){
      return res.status(400).json({message:"Please fill all fields"})
    }

    const existingUser=await User.findOne({email});

    if(existingUser){
      return res.status(400).json({message:"Email already exists"})
    }

    const passwordHash=await bcrypt.hash(password,10)

    const user=await User.create({
      name,
      email,
      role,
      password:passwordHash
    })

    return res.status(201).json({message:"User Created Succesfully",user})

  } catch (error) {
    console.log(error); 
    return res.status(500).json({message:"Internal Server Error"})  
  }
}

export const login=async(req, res)=>{
  try {
    const {email, password}=req.body

    if(!email||!password){
      return res.status(400).json({message:"Please fill the all the fields"})
    }

    const user=await User.findOne({email})

    if(!user){
      return res.status(400).json({message:"User not found"})
    }

    const isPasswordCorrect=await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
      return res.status(400).json({message:"Incoorect Password"})
    }

    const token=jwt.sign({
      id:user._id,
      role:user.role,
      email:user.email
    },{
      secret:process.env.JWT_SECRET,
      expiresIn:"1d"
    })

    return res.status(200).json({message:"Login Succesfull",token,user})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Interval Server error"})
  }
}

export const getProfile=async(req, res)=>{
  try {
    const {id}=req.user

    if(!id){
      return res.status(400).json({message:"Please login first"})
    }

    const user=await User.findById(id).populate({
      path:"address",
      path:"cart",
      path:"orders",
      path:"product"
    }).select("-password")

    if(!user){
      return res.status(400).json({message:"User not found"})
    }

    return res.status(200).json({message:"Profile fetched successfull",user})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server error"})
  }
}

// export const logout=async((req, res)=>{
//    try {
    
//   } catch (error) {
//     console.log(error);
//   }
// })

export const updateProfile=async(req, res)=>{
  try {
    const {id}=req.user

    if(!id){
      return res.status(400).json({message:"Please login first"})
    }

    const {name, email, role, phone}=req.body
    const user=await User.findById(id)

    if(!user){
      return res.status(400).json({message:"User not found"})
    }

    if(name){
      user.name=name
    }

    if(email){
      user.email=email
    }

    if(role){
      user.role=role
    }

    if(phone){
      user.phone=phone
    }

    await user.save();

    return res.status(200).json({message:"Profile updated succesfully", user})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal Server error"})
  }
}