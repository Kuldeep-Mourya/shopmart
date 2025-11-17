 import Product from "../models/product.model.js"
 import User from "../models/User.model.js"
 import {fileUpload} from "../config/upload.cloudinary.js"

 export const createProduct=async(req, res)=>{
  try {
    const userid=req.body.id

    if(!userid){
      return res.status(400).json({message:"Please login first"})
    }

    const{name, description,prices,category,stocks,discount}=req.body

    if(!name||!description||!prices||!category||!stocks||!discount){
      return res.status(400).json({message:"Please fill all the record"})
    }

    const images=req.files.image

    if(!images){
      return res.status(400).json({message:"Please upload an image"})
    }

    const findUser=await findById(userid)

    if(!findUser){
      return res.status(400).json({message:"User not found"})
    }

    const imageURL=await findUpload(images)

    const product=await Product.create({
      name,
      description,
      prices,
      imageUrl:imageURL,
      category,
      stock,
      discount,
      user:findUser._id
    })

    return res.status(201).json({message:"Product created succesfully",product})

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
  }
 }

 export const updateProduct=async(req,res)=>{
  try {
    const {id}=req.params;

    if(!id){
      return res.status(400).json({message:"Please Provide a product id"})
    }

    const userId=req.user.id;

    if(!userId){
      return res.status(400).json({message:"Please login first"})
    }

    const {name,description,prices,category,stock,discount}=req.body

    const product=await Product.findById(id)

    if(!product){
      return res.status(400).json({message:"Product not found"})
    }

    const images=req.files.image

    if(images){
      const imageURL=await fileUpload(images)
      product.imageUrl=imageURL
    }

    if(userId!==product.user){
      return res.status(400).json({message:"You are not onwer of this product"})
    }

    if(name){
      product.name=name
    }

    if(description){
      product.description=description
    }

    if(prices){
      product.prices=prices
    }

    if(category){
      product.category=category
    }

    if(stock){
      product.stock=stock
    }

    if(discount){
      product.discount=discount
    }

    await product.save()

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
  }
 }


 export const deleteProduct=async(req,res)=>{
  try {
    const {id}=req.params

    if(!id){
      return res.status(400).json({message:"Please Provide a product id "})
    }

    const userId=req.user.id

    if(!userId){
      return res.status(400).json({message:"Please login first"})
    }

    const product=await Product.findById(id)

    if(!product){
      return res.status(400).json({message:"Product not found"})
    }

    if(userId!==product.user){
      return res.status(400).json({message:"You are not onwer of this product"})
    }

    await product.delete();

    return res.status(200).json({message:"Product deleted succesfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
  }
 }


 export const getProducts=async(req,res)=>{
    try {
     // Searching, Sorting, Pegination 
     const {search,category,maxPrice,minPrice,sortBy,page=1, limit=10}=req.query

     const filter={}

     if(search){
      filter.name={$regex:search, $options:"i"}
     }

     if(category){
      filter.category=category
     }

     if(maxPrice){
      filter.prices={$lte:maxPrice}
     }

     if(minPrice){
      filter.prices={$gte:minPrice}
     }

     if(sortBy){
      filter.sortBy=sortBy
     }

     const products=await Product.find(filter).populate({
      path:"category",
      path:"user",
      path:"ratingAndReview",
      path:"stock",
      path:"discount"
     }).sort(filter.sortBy).skip((page-1)*limit).limit(limit)

     return res.status(200).json({message:"Product fetched succesfully"})

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
  }
 }


 export const getProductById=async(req, res)=>{
    try {
     const {id}=req.params

     if(!id){
      return res.status(400).json({message:"Please Provide a Product id"})
     }

     const product=await Product.findById(id).populate({
      path:"category",
      path:"user",
      path:"ratingAndReview",
      path:"user",
      path:"stock",
      path:"discount"
     })

     if(!product){
      res.status(200).json({message:"Product not found"})
     }

     return res.status(200).json({message:"Product fetched succesfully",product})

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
  }
 }