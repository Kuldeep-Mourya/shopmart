import mongoose from 'mongoose'

const CategorySchema=new mongoose.Schema({
  categoryName:{
    type:String,
    required:true
  },
  admin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Admin'
  },
  category:[
    {
      type:mongoose.Schema.Type.ObjectId,
      ref:'Category'
    }
  ]
},{
  timestamps:true
})
export default mongoose.model('Category', CategorySchema)