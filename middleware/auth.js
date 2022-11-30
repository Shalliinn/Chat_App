const jwt=require('jsonwebtoken')
const User=require('../models/user')


const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization')
//console.log(token,'8');
        const user=jwt.verify(token,process.env.TOKEN_SECRET);
      // console.log(user.userId,'10');
     //  console.log(typeof(user.userId));
        User.findByPk(user.userId).then(user=>{
          // console.log(user,'12')
            req.user=user;
            next()
        })
    }catch(err){
        console.log(err);
        return res.status(401).json({success:false})
        }   
}
module.exports={
    authenticate
}