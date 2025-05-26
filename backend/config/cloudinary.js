import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv'

dotenv.config({
       path:"../.env"
});
cloudinary.config({
       cloud_name : process.env.CLOUDINARY_CLOUDNAME,
       api_key : process.env.CLOUDINARY_API_KEY,
       api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localPath) => {
       try {
              if(!localPath){
                     return null
              }
              const response =await cloudinary
                                   .uploader
                                   .upload(localPath,{
                                          resource_type : "auto"
                                   })
              fs.unlinkSync(localPath)
              return response;
                                                 
       } catch (error) {
              return null
       }
}

const deleteOnCloudinary = async(fileId) => {
      try {
       if(fileId ){
              return null;
       }
       const response = cloudinary.uploader.destroy(fileId,{resource_type : "auto"})
       return response       
      } catch (error) {
              return null;
      }
}

export {uploadOnCloudinary,deleteOnCloudinary};