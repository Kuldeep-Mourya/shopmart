import cloudinary from "cloudinary"

const cloudinaryConfig={
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
}

cloudinary.config(cloudinaryConfig)

export const fileUpload=async(files)=>{
  try {
    const uploadResponse=file.map((file)=>{
      const base64=`data:${file.mimetype};base64,${file.buffer.toString("base64")}`

      return cloudinary.uploader.upload(base64,{
        folder:"shopmart",
        resource_type:"auto"
      })
    })
    const result=await Promise.all(uploadResponse);
    return result.map(res=>res.secure_url)
    
  } catch (error) {
    console.log(error)
    return null
  }
}