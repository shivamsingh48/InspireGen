import express, { Router } from 'express'
import { generateImage } from '../controllers/image.controller.js'
import { verifyJwt } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.use(verifyJwt)

router.route('/generate-image').post(generateImage)

export default router