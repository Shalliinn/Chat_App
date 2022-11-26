const path=require('path');
const express=require('express')
const bodyParser=require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./util/database');
const userRoutes=require('./routes/users')
const user=require('./models/user')


const app=express();
app.use(bodyParser.json({extended:false}));
var cors=require('cors');
app.use(cors());
app.use(userRoutes);

sequelize
.sync()
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})