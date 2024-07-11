const express=require('express')
const router=express.Router();


router.get('/',(req,res)=>{
    res.send("homepage khulega")
})
router.get('/home',(req,res)=>{
    res.send("homepage khulega")
})
router.get('/contact',(req,res)=>{
    res.send("contact page khulega")
})




module.exports= router;
