const Sequelize=require('sequelize')

const sequelize= new Sequelize('ChatApp','root','Spi@4300',{
    dialect :'mysql',
    host:'localhost'
})

 module.exports=sequelize;