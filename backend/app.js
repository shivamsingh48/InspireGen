import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js';

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const allowedOrigins = [
    'http://localhost:5173', 
    'https://inspiregen.onrender.com', 
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true); 
      } else {
        callback(new Error('Not allowed by CORS')); 
      }
    },
    credentials: true,
  }));

app.use(express.static("public"))
app.use(cookieParser())


import userRouter from './routes/user.routes.js'
import imageRouter from './routes/image.routes.js'


app.use('/api/v1/users',userRouter)
app.use('/api/v1/image',imageRouter)

app.use(errorHandler);

export {app}