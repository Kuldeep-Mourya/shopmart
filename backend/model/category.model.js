import mongoose from 'mongoose'

const CategorySchema=new mongoose.Schema({
  categoryName:{
    type:String,
    required:true
  },
  admin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Admin'
  }
},{
  timestamps:true
})
export default mongoose.model('Category', CategorySchema)