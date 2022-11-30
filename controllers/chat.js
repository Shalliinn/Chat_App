const Chat=require('../models/chat')
const User=require('../models/user')

exports.chatpost=(req,res,next)=>{
    const message=req.body.message;
    const grpId=req.body.grpId;
    console.log(grpId,'7777777777');
    const id=req.user.id
    const name=req.user.name
    console.log(req.user.id,'5');
        Chat.create({
            message:message,
            userId:id,
            userName:name,
            groupId:grpId
        })
      .then((data)=>{
        res.status(200).json({data:data,user:req.user})
      })
      .catch((err)=>{
        console.log(err);
      })
}

exports.chatget=(req,res,next)=>{
  //console.log(req.query.lastmsgid,'23');
  let lastmsgid=+req.query.lastmsgid;
 // console.log(typeof(lastmsgid),'24');
let groupId=req.params.grpId
    Chat.findAll({where:{groupId:groupId},offset:lastmsgid})
    .then((chat)=>{
      //console.log(chat,'39');
      res.status(200).json({allchats:chat,user:req.user})
    })
    .catch(error=>{
      console.log(error)
    })
  }
