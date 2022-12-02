
const Group = require('../models/group');
const Groupchat = require('../models/groupchat');
const User = require('../models/user');


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
const isAdmin=req.body.isAdmin;
Groupchat.create({
    userId:userId,
    groupId:groupId,
    isAdmin:isAdmin
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

 exports.getGroupUsers=async (req,res,next)=>{
   let id= req.params.grpid
   let a=[]
   console.log(req.user.id,'61',id);
   let user=await User.findAll()
   let Admin=await Groupchat.findAll({where:{groupId:id,userId:req.user.id}})
   let group= await Groupchat.findAll({where:{groupId:id}})
  for(let i=0;i<group.length;i++){
let u=await User.findByPk(group[i].userId)
// console.log(u,'66');
    a.push(u);
    //console.log(a);
  }
 // console.log(a,'70');
    res.status(200).json({allgroup:group,grpuser:a,alluser:user,loged:req.user,userchat:Admin})
}
    

exports.updateGroupchat=(req,res,next)=>{
    let id=req.body.id;
    let isAdmin=req.body.isAdmin
   // console.log(id,'78');
Groupchat.findByPk(id)
.then((grp)=>{
    grp.isAdmin=isAdmin;
   // console.log(grp,'83');
   return grp.save();
})
}
exports.deleteGroupuser=(req,res,next)=>{
  let id=req.params.id
  console.log(id,'89');
  Groupchat.findByPk(id)
  .then((grp)=>{
    console.log(grp,'91111111');
    return grp.destroy();
  }).catch(err=>console.log(err))
}