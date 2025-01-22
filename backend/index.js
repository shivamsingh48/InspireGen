import { app } from './app.js'
import mongoConnect from './db.js';
import 'dotenv/config'

const PORT=process.env.PORT || 8000;

mongoConnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log('Listing server on Port -',PORT);
    })
})
.catch((error)=>{
    app.on("error",(error)=>{
        console.log("ERR: ",error);
    })
})