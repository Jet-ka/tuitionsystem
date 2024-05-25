import express from 'express';
//import mongoose from 'mongoose';
const router=express.Router();

router.get('/:id',async (req,res)=>{
    try {
       const id=req.params.id;
       res.render('job.ejs',{infos:id}) 
    } catch (error) {
       res.send('error') 
    }
})

export default router;