//crud evaluation
const express = require("express");

const router = express.Router();

const Evaluation = require("../models/evaluation.model");

router.post("" , async (req,res) =>{

    try{
    const user = await Evaluation.create(req.body);
    return res.status(200).send(user);
    }catch(e){
        return res.send(e.message);
    }
})

router.get("" , async (req,res) =>{

    try{
    const user = await Evaluation.find();
    return res.status(200).send(user);
    }catch(e){
        return res.send(e.message);
    }
})

//fectching students who gave same evaluation
router.get("/:id",async(req,res)=>{
    try{
        const user=await Evaluation.findById(req.params.id).populate('student_id').lean().exec();
        
        
        return res.status(200).send(user);
    }
    catch(e){
        return res.send(e.message);
    }
})

module.exports = router;