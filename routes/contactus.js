import express from 'express';
//import mongoose from 'mongoose';
const router=express.Router();

router.get('/:id', async (req,res)=>{
    try{
        const id= req.params.id;
       // console.log(id)
        res.render('contactus.ejs',{infos:id});
    }catch{
        console.log('error')
       // res.send('Internal error')
    }
})








export default router;