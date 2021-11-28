//crud topic
const express = require("express");

const router = express.Router();

const Topic = require("../models/topic.model");


router.post("" , async (req,res) =>{

    try{
    const user = await Topic.create(req.body);
    return res.status(200).send(user);
    }catch(e){
        return res.send(e.message);
    }
})


router.get("" , async (req,res) =>{

    try{
    const user = await Topic.find();
    return res.status(200).send(user);
    }catch(e){
        return res.send(e.message);
    }
})


module.exports = router;