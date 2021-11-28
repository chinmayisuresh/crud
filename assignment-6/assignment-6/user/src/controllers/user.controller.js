//crud users
const express = require("express");

const router = express.Router();

const User = require("../models/user.model");


router.post("/" , async (req,res) =>{

    try{
    const user = await User.create(req.body);
    return res.status(200).send(user);
    }catch(e){
        return res.send(e.message);
    }
})

router.get("/",async(req,res)=>{
    try{
        const user=await User.find();
        return res.status(200).send(user);
    }
    catch(e){
        return res.send(e.message);
    }
    
})

module.exports = router;