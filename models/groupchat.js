const Sequelize=require('sequelize');

const sequelize= require('../util/database');
const Groupchat=sequelize.define('groupchat',{
    id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
    }
})
module.exports=Groupchat;