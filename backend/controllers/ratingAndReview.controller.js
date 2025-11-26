import Product from "../model/product.model.js"
import RatingAndReview from "../model/ratingAndReview.model.js"


//Create a new rating and review
export const createRatingAndReview=async(req, res)=>{
 try {
  const userId=req.user._id
  const productId=req.body.productId
  const rating=req.body.rating
  const review=req.body.review

  if(!productId){
    return res.status(400).json({message:"Please provide a product Id"})
  }

  if(!rating||!review){
    return res.status(400).json({message:"Please provide a rating and review"})
  }
  
  // const user=await User.findById(userId)

  // if(!user){
  //   return res.status(400).json({message:"User not found"})
  // }

  const product=await Product.findById(productId)

  if(!product){
    return res.status(400).json({message:"Product not found"})
  }

  const newRatingAndReview=await RatingAndReview.create({
    user:userId,
    product:productId,
    rating:rating,
    review:review
  })

  res.status(201).json({message:"Rating and review created succesfully", ratingAndReview:newRatingAndReview})

 } catch (error) {
  console.log(error);
  return res.status(500).json({message:"Internal server error"})
 }
}

//get all rating and review
export const getAllRatingAndRaview=async(req, res)=>{
  try {
    const allRatingAndReviews=await RatingAndReview.find().populate("product").populate("user")

    if(!allRatingAndReviews){
      return res.status(400).json({message:"Rating and Reviews not found"})
    }

    res.status(200).json({message:"Rating And Raviews fateched succesfully",ratingAndReview:allRatingAndReviews})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
  }
}