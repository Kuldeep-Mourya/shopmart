import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const authmiddleware=async(req, res, next)=>{
  try {
    const token=req.headers.authorization;

    if(!token){
      return res.status(401).json({message:"Please login first"})
    }

    try {
      const decoded=jwt.verify(token, process.env.JWT_SECRET)

      req.user=decoded
      next()
    } catch (error) {
      console.log(error);
      return res.status(401).json({message:"Invalid token "})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})    
  }
}