import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

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

export {
    registerUser,
    login,
    logoutUser,
    getUserDetails
}