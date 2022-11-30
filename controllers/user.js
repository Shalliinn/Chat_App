const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { log } = require('console');

exports.newuser=(req,res,next)=>{
    const {name,email,phoneNumber,password}=req.body;
console.log(phoneNumber,'8',typeof(phoneNumber));
    if(name.length==0 || email.length==0 || phoneNumber.length==0 || password.length==0){
        return res.status(400).json({err: "somethings missing"})
    }
    bcrypt.hash(password,10,(err,hash)=>{
        User.findAll({where:{email:email}})
        .then((user)=>{
            if(user.length>0){
                res.status(200).json({message:"User already exist"})
            }
            else{
                User.create({
                    name:name,
                    email:email,
                    phoneNumber:phoneNumber,
                    password:hash
                })
                .then(()=>{
                    res.status(200).json({message:'User created'})
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        })
    })
}

function generateAccessToken(id,name){
    return jwt.sign({userId:id,name:name},process.env.TOKEN_SECRET)
    }
    

 exports.existinguser=(req,res,next)=>{
    const {email,password}=req.body
    if(email.length==0 || password.length==0){
        return res.status(400).json({err: "somethings missing"})
    }
    User.findAll({where:{email:email}})
    .then((user)=>{
        if(user.length>0){
            const User=user[0].toJSON()
            console.log(User.email,'41');

            bcrypt.compare(password,User.password,(err,result)=>{
                if(err){
                    res.status(500).json({message:"something went wrong"})
                 }
                 else if(result===true){
                    res.status(200).json({message:"Successfully logged in",token:generateAccessToken(User.id,User.name)})
                 }
                 else{
                    res.status(401).json({message:"Password is incoorect"})
                 }
            })
        }
     else{
        res.status(404).json({message:"User not exist"})
     }
    })
    .catch(err=>{console.log(err)})
}

