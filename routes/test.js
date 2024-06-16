import express from 'express';
import bodyparser from 'body-parser';
//import mongoose from 'mongoose';
import {assamhistory,quant} from '../question/question.js';
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
      if(value=="assamhistory"){
         res.render('quiz.ejs',{sub:assamhistory,infos:id,value:value})
        // console.log(assamhistory)
      } if(value=="quant"){
        res.render('quiz.ejs',{sub:quant,infos:id,value:value}) 
      }
      
   } catch (error) {
      console.log(error)
   }
})
//result calculate after user submit their answer
router.post('/num/:id',async (req,res)=>{
   try {
      const id=req.params.id;
     // console.log(id);
      let score=0;
      //console.log(score)
     // let wrong=0;
         
 const {value,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eightteen,nineteen,twenty}=req.body;
 //for assamhistory logic     
 if(value=='assamhistory'){

 //for next question
 
if(one==assamhistory[0].answer){
   score++;
 }
if(two==assamhistory[1].answer){
   score++;
}
if(three==assamhistory[2].answer){
   score++
}

if(four==assamhistory[3].answer){
   score++
}
if(five==assamhistory[4].answer){
  score++
}
if(six==assamhistory[5].answer){
 score++
}
if(seven==assamhistory[6].answer){
   score++
}
if(eight==assamhistory[7].answer){
   score++
}
if(nine==assamhistory[8].answer){
 score++
}
if(ten==assamhistory[9].answer){
   score++
}
if(eleven==assamhistory[10].answer){
   score++
}
if(twelve==assamhistory[11].answer){
   score++
}
if(thirteen==assamhistory[12].answer){
   score++
}
if(fourteen==assamhistory[13].answer){
   score++
}
if(fifteen==assamhistory[14].answer){
   score++
}
if(sixteen==assamhistory[15].answer){
   score++
}
if(seventeen==assamhistory[16].answer){
  score++
  }
if(eightteen==assamhistory[17].answer){
   score++
}
if(nineteen==assamhistory[18].answer){
   score++
}
if(twenty==assamhistory[19].answer){
   score++
}

res.render('result.ejs',{mark:score,value:value,id:id})

//for quant logic
 }if(value=='quant'){
if(one==quant[0].answer){
   score++
}if(two==quant[1].answer){
   score++
}if(three==quant[2].answer){
   score++
}if(four==quant[3].answer){
   score++
}if(five==quant[4].answer){
   score++
}if(six==quant[5].answer){
   score++
}if(seven==quant[6].answer){
   score++
}if(eight==quant[7].answer){
   score++
}if(nine==quant[8].answer){
   score++
}if(ten==quant[9].answer){
   score++
}

res.render('result.ejs',{mark:score,value:value,id:id})
 }



 
   } catch (error) {
   // console.log(error)  
   res.send("Error")
   }
})




export default router