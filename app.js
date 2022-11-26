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

const app=express();
app.use(bodyParser.json({extended:false}));
var cors=require('cors');
const { HasMany } = require('sequelize');
app.use(cors());
app.use(userRoutes);
app.use(chatRoutes);

 User.hasMany(Chat);
 Chat.belongsTo(User);



sequelize
.sync()
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})