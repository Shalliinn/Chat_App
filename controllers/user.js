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
