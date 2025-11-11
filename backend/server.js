import app from "./src/app.js"
import dotenv from "dotenv"
dotenv.config();
import connectDb from "./config/db.js";


const PORT=process.env.PORT || 5000
connectDb()
app.listen(PORT, ()=>{
  console.log(`Server is running on ${PORT}`)
})