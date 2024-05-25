import express from 'express';
import bodyparser from 'body-parser';
//import mongoose from 'mongoose';
const router=express.Router();

router.use(bodyparser.urlencoded({extended:true}));

router.get('/:id',async (req,res)=>{
    try {
       const id=req.params.id;
     //  console.log(id)
       res.render('testpaige.ejs',{infos:id}) 
    } catch (error) {
       console.log('error') 
    }
} )

router.post('/:id',async (req,res)=>{
   try {
      const id=req.params.id;
      const value=req.body.topic;
     // console.log(value)
      
      res.render('quiz.ejs',{sub:value,infos:id})
   } catch (error) {
      console.log(error)
   }
})

router.post('/num/:id',async (req,res)=>{
   try {
      const id=req.params.id;
      let number=0;
      const {subject,one}=req.body;
 if(one=='displacement'){
   number++
 }
 res.render('result.ejs',{id:id,subject:subject,mark:number})
   } catch (error) {
    console.log(error)  
   }
})




export default router