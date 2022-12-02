const path=require('path');
const express=require('express')
const bodyParser=require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const User=require('./models/user')
const Chat=require('./models/chat')
const sequelize = require('./util/database');
const userRoutes=require('./routes/users')
const chatRoutes=require('./routes/chats')
const groupRoutes=require('./routes/groups')

const app=express();
app.use(bodyParser.json({extended:false}));
var cors=require('cors');
const { HasMany } = require('sequelize');
const Group = require('./models/group');
const Groupchat = require('./models/groupchat');
const { truncate } = require('fs');
app.use(cors());
app.use(userRoutes);
app.use(chatRoutes);
app.use(groupRoutes);

 User.hasMany(Chat);
 Chat.belongsTo(User);

 Group.hasMany(Chat);
 Chat.belongsTo(Group);

 User.belongsToMany(Group,{through:Groupchat});
 Group.belongsToMany(User,{through:Groupchat});


sequelize
.sync()

.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})