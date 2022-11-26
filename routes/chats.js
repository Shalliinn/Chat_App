const path=require('path');
const express=require('express')
const chatController=require('../controllers/chat')
const userauthentication=require('../middleware/auth')
const router = express.Router();

router.post('/chat/post', userauthentication.authenticate,chatController.chatpost);
router.get('/chat/get', userauthentication.authenticate,chatController.chatget);
module.exports=router;