import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import FormData from 'form-data'
import axios from 'axios'
import { User } from "../models/user.model.js";

export const generateImage=asyncHandler(async (req,res)=>{
    const user=req.user;
    const {prompt}=req.body;

    if(!user || !prompt){
        throw ApiError(400,"Missing Details")
    }

    if(user.creditBalance===0 || user.creditBalance<0){
        return res.status(400)
        .json(new ApiResponse(
            401,
            {
                creditBalance:user.creditBalance
            },
            "No credit Balance"
        ))
    }

    const formData=new FormData()
    formData.append("prompt",prompt)

   const {data}= await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{
        headers: {
            'x-api-key': process.env.CLIPDROP_API,
          },
          responseType:"arraybuffer"
    })

    const base64Image=Buffer.from(data,'binary').toString('base64')
    const resultImage=`data:image/png;base64,${base64Image}`

    await User.findByIdAndUpdate(
        user._id,
        {
            creditBalance:user.creditBalance-1
        },
        {
            new:true
        }
    )

    return res.status(201)
    .json(
        new ApiResponse(
            201,
            {
                creditBalance:user.creditBalance,
                resultImage
            },
            "Image generated successfully"
        )
    )
    
})