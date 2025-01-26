import express from 'express'
import { getUserDetails, googleLogin, login, logoutUser, paymentRazarpay, registerUser, verifyRazorPay } from '../controllers/users.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router=express.Router();

router.route('/signup').post(registerUser)
router.route('/login').post(login)
router.route('/google').get(googleLogin)

router.use(verifyJwt)
router.route('/getUser').get(getUserDetails)
router.route('/logout').post(logoutUser)
router.route('/pay-razor').post(paymentRazarpay)
router.route('/verify-razor').post(verifyRazorPay)


export default router