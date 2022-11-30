const Sequelize=require('sequelize');

const sequelize= require('../util/database');
const Group=sequelize.define('group',{
    id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
    },
    Gname:{
    type:Sequelize.STRING
    },
    createdby:{
        type:Sequelize.STRING
    }
})
module.exports=Group;