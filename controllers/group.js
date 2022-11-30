
const Group = require('../models/group');
const Groupchat = require('../models/groupchat');
const User=require('../models/user')

exports.getUser=(req,res,next)=>{
    User.findAll()
    .then((user)=>{
        res.status(200).json({alluser:user,user:req.user})
    })
    .catch(err=>console.log(err));
}

exports.postGroup=(req,res,next)=>{
    const name=req.body.name;
    console.log(req.body.name,'15');
const createdby=req.user.name;
   // console.log(createdby);
    Group.create({
        Gname:name,
        createdby:createdby
    })
    .then((data)=>{
        res.status(200).json({data:data,user:req.user})
      })
      .catch((err)=>{
        console.log(err);
      })
}
exports.postGroupChat=(req,res,next)=>{
const userId=req.body.userId;
const groupId=req.body.groupId;
Groupchat.create({
    userId:userId,
    groupId:groupId
})
.then((data)=>{
    res.status(200).json({data:data,user:req.user})
  })
  .catch((err)=>{
    console.log(err);
  })
}

exports.getGroup=(req,res,next)=>{
    let id=req.user.id;
   req.user.getGroups()
    .then((user)=>{
        //console.log(user,'49');
        res.status(200).json({allgroup:user,user:req.user})
    })
    .catch(err=>console.log(err));
}

    