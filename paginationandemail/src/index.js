const express=require('express');
const app=express();
app.use(express.json());
const connect=require('./config/db.js');


const productController=require("./controllers/user.controller.js");

app.use("/user",productController);




app.listen(2345,async()=>{
    await connect();
    console.log('listening on 2345');
});




