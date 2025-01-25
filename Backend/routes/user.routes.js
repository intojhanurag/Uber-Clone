const express=require('express');
const router=express.Router();
const {body}=require("express-validator");
const userController=require('../controllers/user.controller');
const authMiddleware=require('../middleware/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({mid:3}).withMessage
    ('First name must be at least 3 char long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 char')

],
    userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password')
],userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)
module.exports=router;
