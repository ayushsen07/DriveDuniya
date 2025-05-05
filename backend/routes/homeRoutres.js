const express =require('express')
const router=express.Router()
router.get('/',(req,res)=>{

    res.status(200).json({Message:'Hello from Backend'})
    console.log('Hello from Backend');
    
}) 


module.exports=router