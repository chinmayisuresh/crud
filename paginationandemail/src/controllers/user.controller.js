const express=require('express');

const transporter=require("../config/mail");

const router=express.Router();

const User=require("../models/user.model");

router.get("/",async(req,res)=>{
    try{
        const user=await User.find().lean().exec()
        return res.send(user);
    }
    catch(e){
        return res.status(500).send(e.message);
    }

});



router.post("/",async(req,res)=>{
    try{
        const user=await User.create(req.body);


        const message = {
             from: "abc@a.com",
             to: `${req.body.email}`,
             subject: `created a new user ${req.body.first_name},${req.body.last_name}`,
             text: `Hi ${req.body.first_name} please confirm your email address`,
             html: `Hi ${req.body.first_name} please confirm your email address`
           };

           const message1 = {
            to: ["admin1@abc.com","admin2@abc.com","admin3@abc.com","admin4@abc.com","admin5@abc.com"],
            from: "abc@gmail.com",
            subject: ` ${req.body.first_name} ${req.body.last_name} has registered with us`,
            text: ` Please welcome ${req.body.first_name} ${req.body.last_name}`,
            html: `Hi ${req.body.first_name} please confirm your email address`
          };

          transporter.sendMail(message);
          transporter.sendMail(message1);
        return res.send(user);
    }
    catch(e){
        return res.send(e.message);
    }
})

module.exports=router;