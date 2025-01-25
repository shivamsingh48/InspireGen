import express from 'express'
import { getUserDetails, login, logoutUser, registerUser } from '../controllers/users.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router=express.Router();

router.route('/signup').post(registerUser)
router.route('/login').post(login)

router.use(verifyJwt)
router.route('/getUser').get(getUserDetails)
router.route('/logout').post(logoutUser)



export default router