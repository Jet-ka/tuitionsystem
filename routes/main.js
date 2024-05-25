import express from 'express';
import {user } from '../module/record.js'
const router= express.Router();

router.get('/:id',async (req,res)=>{
    try {
      const id=req.params.id;
    //  console.log(id)
      const result= await user.findById(id);
    //  console.log(result)
      res.render('main.ejs',{infos:result})  
    } catch (error) {
        console.log('error')
    }
})

export default router