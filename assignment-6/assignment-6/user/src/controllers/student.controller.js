const express = require("express");

const router = express.Router();

const Student = require("../models/student.model");


//crud students
router.post("" , async (req,res) =>{

    try{
    const user = await Student.create(req.body);
    return res.status(200).send(user);
    }catch(e){
        return res.send(e.message);
    }
})

router.get("" , async (req,res) =>{

    try{
    const user = await Student.find();
    return res.status(200).send(user);
    }catch(e){
        return res.send(e.message);
    }
});

//highest marks
router.get("/marks",async(req,res)=>{
    try{
        const user=await Student.find().sort({marks:-1}).limit(-1).lean().exec();
         return res.status(200).send(user);
    }
    catch(e){
        return res.send(e.message);
    }
});

module.exports = router;