import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import razorpay from 'razorpay'
import { Transaction } from "../models/transaction.model.js";
import { oauth2client } from "../utils/googleConfig.js";
import axios from 'axios'
import crypto from 'crypto';


const generateAccessAndRefreshToken=async(userId)=>{
        try {
            const user=await User.findById(userId);
            const accessToken=user.generateAccessToken();
            const refreshToken=user.generateRefreshToken();

            user.refreshToken=refreshToken;
            await user.save({validateBeforeSave:false})

            return {accessToken,refreshToken}
        } catch (error) {
            throw new ApiError(500,"Something went wrong while generating access and refresh Token");
        }
}

const registerUser=asyncHandler(async (req,res)=>{
    const {fullName,email,password}=req.body;

    if([fullName,email,password].some((field)=>field?.trim()==="")){
        throw new ApiError(401,"All fields are required!")
    }

    const existedUser=await User.findOne({email})

    if(existedUser){
        throw new ApiError(400,"This email is already registered")
    }

    const user=await User.create({
        fullName,
        email,
        password
    })

    if(!user){
        throw new ApiError(401,"Something went while registering user!")
    }
    return res.status(201).json(
        new ApiResponse(
            201,
            user,
            "User registered successfully"
        )
    )
})

const login=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;

    if(!email){
        throw new ApiError(400,"Email is required!")
    }

    const user=await User.findOne({email});

    if(!user){
        throw new ApiError(401,"User not found!")
    }

    const isPassword=await user.isPasswordCheck(password)
    if(!isPassword){
        throw new ApiError(401,"Invalid creditionals!")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);

    const loggedInUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,
                accessToken,
                refreshToken
            },
            "user singned successfully"
        )
    )

})

const googleLogin=asyncHandler(async (req,res)=>{
    const {code}=req.query;
    const googleRes=await oauth2client.getToken(code)
    oauth2client.setCredentials(googleRes.tokens)

    const userRes=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)

    if(!userRes){
        throw new ApiError(500,"google api Error!")
    }

    const {email,name:fullName,picture:avatar}=userRes.data
    let user=await User.findOne({email})

    if(!user){
        const randomPassword = crypto.randomBytes(16).toString('hex');
        user=await User.create({
            fullName,
            password:randomPassword,
            email,
            avatar
        })
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);

    user=await User.findByIdAndUpdate(user._id,{refreshToken},{new:true}).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user,
                accessToken,
                refreshToken
            },
            "user singned successfully"
        )
    )

})

const logoutUser=asyncHandler(async (req,res)=>{
    const user=req.user;
    await User.findByIdAndUpdate(
        user?._id,
        {
            $unset:{refreshToken:1}
        },{
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(201)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,"","user logged out successsfully"))
})

const getUserDetails=asyncHandler(async (req,res)=>{
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "User data fetched successfully"
        )
    )
})

const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
})


const paymentRazarpay=asyncHandler(async(req,res)=>{
    const {planId}=req.body
    const user=req.user
    if(!user || !planId){
        throw new ApiError(400,"Missing details")
    }

    let plan,credits,amount,date
    
    switch (planId) {
        case 'Basic':
            plan='Basic'
            credits=100
            amount=10
            break;
        
            case 'Advanced':
                plan='Advanced'
                credits=500
                amount=50
                break;

            case 'Business':
                plan='Business'
                credits=5000
                amount=250
                break;
        default:
            throw new ApiError(400,"Plan not found")
    }
    date=Date.now()

    const transactionData={
        userId:user._id,
        plan, amount,credits,date
    }

    const newTransaction=await Transaction.create(transactionData)

    const options={
        amount:amount*100,
        currency:process.env.CURRENCY,
        receipt:newTransaction._id
    }

    await razorpayInstance.orders.create(options,(error,order)=>{
        if(error){
            console.log(error);
            throw new ApiError(402,error)
        }
        return res.status(202).json(new ApiResponse(202,order,"payment processed"))
    })

})

const verifyRazorPay=asyncHandler(async(req,res)=>{

    const {razorpay_order_id}=req.body

    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)

    if(orderInfo.status==='paid'){
        const transactionData=await Transaction.findById(orderInfo.receipt)

        if(transactionData.payment){
            throw new ApiError(402,"Payment failed")
        }

        const userData=await User.findById(transactionData.userId)

        const creditBalance=userData.creditBalance+transactionData.credits
        
        await User.findByIdAndUpdate(userData._id,{
            creditBalance
        })
        await Transaction.findByIdAndUpdate(transactionData._id,{payment:true})

        return res.status(202).json(new ApiResponse(202,"","Credits Added"))
    }
    else{
        throw new ApiError(402,"Payment failed")
    }

})

export {
    registerUser,
    login,
    logoutUser,
    getUserDetails,
    paymentRazarpay,
    verifyRazorPay,
    googleLogin
}