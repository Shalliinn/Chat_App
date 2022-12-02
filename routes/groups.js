const path = require('path');
const express = require('express');
const userauthentication=require('../middleware/auth')
const groupController = require('../controllers/group');
const router = express.Router();
router.get('/user/get', userauthentication.authenticate,groupController.getUser);
router.post('/group/post',userauthentication.authenticate,groupController.postGroup);
router.get('/group/get',userauthentication.authenticate,groupController.getGroup);
router.get('/group-users/get/:grpid',userauthentication.authenticate,groupController.getGroupUsers);
router.post('/group-users/update/',userauthentication.authenticate,groupController.updateGroupchat);
router.delete(`/group-user/delete/:id`,userauthentication.authenticate,groupController.deleteGroupuser);
router.post('/groupchat/post',userauthentication.authenticate,groupController.postGroupChat);
module.exports=router;