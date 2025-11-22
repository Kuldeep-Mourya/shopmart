import Admin from "../model/admin.model"
import Category from "../model/category.model"

export const createCategories=async(req, res)=>{
  try {
    //find userid
    const userId=req.user._id;

    //find category name
    const {categoryName}=req.body

    if(!categoryName){
      return res.status(400).json({message:"Please fill all the field"})
    }

    //find admin
    const admin=await Admin.findOne({_id:userId   })

    if(!admin){
      return res.status(400).json({message:"Admin not found"})
    }

    //check if admin is admin
    if(admin.role!=="Admin"){
      return res.status(400).json({message:"You ate not admin"})
    }

    //find category
    const category=await Category.findOne({categoryName})

    if(category){
      return res.status(400).json({message:""+categoryName+"Category already exist"})
    }

    const newCategory=await Category.create({
      categoryName,
      admin:admin._id
    })

    await Admin.findOneAndUpdate({
      _id:admin._id
    },{
      $push:{
        category:newCategory._id
      }
    })

    return res.status(200).json({message:"Category fetched succesfully",category:newCategory})

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal server error"})
  }
}



export default getCategories=async(req, res)=>{
  try {
    const getAllCategories=await Category.find({})

    return res.status(200).json({message:"Category fetched succesfully",categories:getAllCategories})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
  }
}