const { BOOLEAN } = require('sequelize');
const Sequelize=require('sequelize');

const sequelize= require('../util/database');
const Groupchat=sequelize.define('groupchat',{
    id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
    }
,
isAdmin:{
    type:BOOLEAN
}
})
module.exports=Groupchat;