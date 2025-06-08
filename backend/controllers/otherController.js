import Other from "../model/other.js"
import User from "../model/User.js"

// export const updateUserCount = async(req,res) => {
//        const {number,message} = req.body
//        const {user} = req
//        console.log("ho",user)
//        try {
//               const  admin = await User.findById(user.userId)
//               if(admin.email !== 'dreampay.help@gmail.com'){
//                      throw new Error("admin not found")
//               }
//               const other = Other.create({
//                      totaluser : number,
//                      message ,

//               })
             
//               res.json({success:true,other})
//        } catch (error) {
//               res.json({success:false,message:error.message})
//        }

// }
export const updateUserCount = async(req,res) => {
       const {number,message} = req.body
       const {user} = req
       try {
              const  admin = await User.findById(user.userId)

              if(admin.email !== 'dreampay.help@gmail.com'){
                     throw new Error("admin not found")
              }
              const other =await Other.find()
              // console.log(other)
              other[0].totaluser = number
              if(message.length > 5 ){
                     other[0].message = message 
              }
              await other[0].save();
              // console.log(other)
              res.json({success:true})
       } catch (error) {
              res.json({success:false,message:error.message})
       }

}
export const getOther = async(req,res) => {
       try {
              const other =await Other.find()
            
              res.json({success:true,other})
       } catch (error) {
              res.json({success:false,message:error.message})
       }

}