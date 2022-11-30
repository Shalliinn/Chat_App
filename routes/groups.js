const path = require('path');
const express = require('express');
const userauthentication=require('../middleware/auth')
const groupController = require('../controllers/group');
const router = express.Router();
router.get('/user/get', userauthentication.authenticate,groupController.getUser);
router.post('/group/post',userauthentication.authenticate,groupController.postGroup);
router.get('/group/get',userauthentication.authenticate,groupController.getGroup);
router.post('/groupchat/post',userauthentication.authenticate,groupController.postGroupChat);
module.exports=router;