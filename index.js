import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyparser from 'body-parser';
import ejs from 'ejs';
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

import {user,batch,student, record,ResetToken,current } from './module/record.js';
//import record from './module/record.js';
import main from './routes/main.js';
import contactus from './routes/contactus.js';
import test from './routes/test.js';
import job from './routes/job.js';
const app=express();

app.set('view engine','ejs');

 app.use(bodyparser.urlencoded({extended:true}));
 app.use(bodyparser.json({limit:'50kb'}));
app.use(express.static('public'));


//main start i.e home click
app.use('/main',main)
//main end

//conatactuslogic middileware
//id tu conatctus.js t pam /contactus/<%=infos._id%> conatctus app.use t aru id tu router.get('/:id')
app.use('/contactus',contactus);

//conatctus end

//job notification start
app.use('/job',job);
//job notification end

//test page start
app.use('/test',test);
app.use('/quiz',test);
app.use('/result',test)
//test page end

//datbase
//mongoose.connect('mongodb://127.0.0.1:27017/newdb');

mongoose.connect(process.env.MONGODB_URL);

//signin

app.get('/signin',function(req,res){
  res.render('signin.ejs')
});

app.post('/',async function(req,res){
  try{
     
 const{name,email,phone,state,location,password}=req.body;
 const hashpassword = bcrypt.hashSync(password,12);
 const response = new user({
  name,
  email,
  phone,
  state,
  location,
  password:hashpassword,
 });
 const result=await response.save();
 const one=await user.findOne({name:name});
// console.log(one);

 if(one && one.password===hashpassword){
  //const two= await student.find({}).populate({path:'user._id'});
 // console.log(two);
 // res.render('page.ejs',{infos:one});
 res.render('main.ejs',{infos:one})
 }

  }catch(err){
     // console.log(err)
     res.send('error')
  }
});


//login

app.get('/',function(req,res){
  res.render('login.ejs')
});

app.post('/login', async function(req,res){
  try {
    const ename=req.body.name;
    const name = ename.trim();
    const password=req.body.password;
  const result= await user.findOne({name:name}).populate('batchname');
if(result){
const one= await bcrypt.compareSync(password, result.password);
if(result.name==name && one){
 res.render('main.ejs',{infos:result})
    // res.render('page.ejs',{infos:result});
}else{
 // res.status(404).send({'Message':'Invalid Details'})
 const data='Invalid details';
 res.render('info.ejs',{info:data});
}
  }else{
    const data='Invalid details';
    res.render('info.ejs',{info:data});
   //res.send('Invalid Details'); 
  }
  } catch (error) {
     // console.log(error)
     res.send('error')
  }

});



//admin for jetlin
app.get('/admin',async function(req,res){
    try {
     // const response= await user.find();
     // res.render('admin.ejs',{infos:response})
      res.render('adminregister.ejs') ;
    } catch (error) {
        res.send({'message':'error'})  
    }
});

app.post('/adminpost',async (req,res)=>{
    try {
        const{name,password}=req.body;
      if(process.env.NAME==name&&process.env.PASSWORD==password){
        const response= await user.find();
        const secret=process.env.SECRET;
        res.render('admin.ejs',{infos:response,secret:secret})
      }  
    } catch (error) {
        res.send({'message':'error'})    
    }
});

//admin.ejs we find one button to click go to contentpage
app.post('/content',async function(req,res){
  try {
    const secret=req.body.secret;
 //  console.log(secret)
  // const secret=req.params.id;
  // console.log(secret)
    const id = process.env.SECRET;
   // console.log(id)
    if (id !== secret) {
     // console.log("Error: Secrets do not match");
      res.status(403).send("Forbidden");
      return;
  }
   const response= await current.find();
   res.render('content.ejs',{infos:response,secret:id});  
    
  } catch (error) {
    res.send('error')
  }
});
//content page we submit corrent afair
app.post('/current',async function(req,res){
  try {
   // const id = process.env.SECRET;
    const {day,topic}=req.body;
    const datas=  new current({
      day,
      topic
     
    });
   
  
    await datas.save();
    const response= await current.find();
  // console.log(response);
    res.render('content.ejs',{infos:response}); 
  } catch (error) {
   // console.log('error')
   res.send('error')
  }
});

//edit of current affair if click edit
app.get('/editcontent/:id',async (req,res)=>{
  try {
    const id=req.params.id;
    const result= await current.findById(id);
    res.render('editaffair.ejs',{infos:result})
  } catch (error) {
   // console.log(error);
    res.send(error)
  }
})

//current affair edit of particular id
app.post('/editaffair/:id',async (req,res)=>{
try {
  const id=req.params.id;
  const{day,topic}=req.body;
   await current.findByIdAndUpdate({_id:id},{$set:{day:day,topic:topic}})
  const response= await current.find();
 // console.log(response);
  res.render('content.ejs',{infos:response})
} catch (error) {
 // console.log(error)
 res.status(500).send('Internate server error')
}
});
//current affair delete
app.get('/deleteaffair/:id',async (req,res)=>{
  try {
    const id=req.params.id;
    await current.findByIdAndDelete(id);
    const response= await current.find();
    res.render('content.ejs',{infos:response});
  } catch (error) {
    res.send(error)
  }
})


//adminend

//current afair start for user when they click current affair section
app.get('/currentaffair/:id',async function(req,res){
  try {
    //user id
    const id=req.params.id;
    const result= await current.find();
   // console.log(result)
    res.render('current.ejs',{infos:result ,id:id})
   // console.log()
  } catch (error) {
   // console.log(error)
   res.send("Internal error")
  }
});

//current affair end


//forget password start
app.get('/forget',async (req,res)=>{
    try{
  res.render('forget.ejs');
    }catch{
        res.send('message:internal server error')
    }
});



app.post('/forgetpassword', async (req, res) => {
  try {
    const { email } = req.body;

    // Step 1: Find the user by email
    const users = await user.findOne({ email });
    if (!users) {
      return res.status(400).send('Invalid email address'); // Avoid revealing existence
    }

    // Step 2: Generate a random token
    function generateToken() {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(20, (err, buf) => {
          if (err) reject(err);
          resolve(buf.toString('hex'));
        });
      });
    }

    const token = await generateToken();

    // Step 3: Save the token in your database (e.g., ResetToken model)
    const resetToken = new ResetToken({
      userId: users._id,
      token,
      expiration: Date.now() + 3600000, // 1 hour in milliseconds
    });
    await resetToken.save();

    // Step 4: Create an email transport using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Step 5: Send the reset email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: users.email,
      subject: 'Password Reset for Your Account',
      html: `
        <h2>Click the link below to reset your password:</h2>
        <a href="https://www.attnify.in/resetPassword?token=${token}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
   // console.log('Reset email sent successfully');

    // Step 6: Respond to the client
    const data='Password reset instructions sent to your email';
    res.render('info.ejs',{info:data});
  } catch (err) {
    //console.error('Error:', err);
    res.status(500).send('Internal server error');
  }
});


//aboutus
app.get('/about/:id',async (req,res)=>{
  try {
    const id=req.params.id;
    const result=await user.findById(id);
    //console.log(data)
    res.render('about.ejs',{infos:result})
  } catch (error) {
    res.send('error')
  }
})
//privacy
app.get('/privacy/:id',async (req,res)=>{
  try {
    const id= req.params.id;
    //console.log(id)
    const result=await user.findById(id);
    res.render('privacy.ejs',{infos:result})
  } catch (error) {
    res.send('error')
  }
});


//after getting token goes to reset page
app.get('/resetPassword',async (req,res)=>{
  try{
const {token}=req.query;
res.render('reset.ejs',{infos:token});
  }catch{
    const data='internal error';
    res.render('info.ejs',{info:data});
  }
})

app.post('/reset', async function(req,res){
    try{
       
     // const {token}=req.params;
      const {token, password, confirmpassword } = req.body;
     // console.log(token)
     // console.log(password)
     // console.log(confirmpassword)
      const resetToken = await ResetToken.findOne({ token:token, expiration: { $gt: Date.now() } }); // Check for unexpired token
      if (!resetToken) {
       // return res.status(400).send('Invalid or expired token');
        const data='Invalid or expired token';
        res.render('info.ejs',{info:data})
      }
  
      // Handle password reset form submission (replace with your form handling logic)
     

      if (password !== confirmpassword) {
       // return res.status(400).send('Passwords do not match');
       const data='Password do not match';
       res.render('info.ejs',{info:data});
      }
      
      // Hash the new password
      const saltRounds = 10; // Adjust salt rounds as needed
      const hashedpassword = await bcrypt.hash(password, saltRounds);
     // console.log(hashedpassword)
      // Update the user's password in the database
      const users = await user.findByIdAndUpdate({_id:resetToken.userId},{$set:{password: hashedpassword}});
     // users.password = hashedpassword;
     // await user.save();
      //console.log(users)
      
      // Delete the reset token
      //await resetToken.delete();
      
   const data=' Password reset successfully! You can now log in with your account '
   
    // const one=JSON.stringify(data);
     //console.log(one);
    res.render('info.ejs',{info:data});
    }catch(err){
        res.send('invalid logic')

    }
    
})


//forgetpassword end


//page t ahibo every time home t nav click korile
app.get('/page/:id', async function(req,res){
    try {
      const id=req.params.id;
      const response= await user.findById(id).populate('batchname');
      res.render('page.ejs',{infos:response});
    } catch (error) {
        //console.log(error)
       res.send('error')
    }
});
//page end

//batchcreate start
app.get('/batchcreate/:id',async function(req,res){
    try {
       const id=req.params.id;
       const result= await user.findById(id);
       res.render('batchcreate',{infos:result}); 
    } catch (error) {
       // console.log(error);
       res.send('Internal Error')
    }
});

app.post('/batch/:id',async  function(req,res){
    try {
      const userid=req.params.id;
    //  console.log(userid);
      const{name,time}=req.body;
      const newbatch= new batch({
       name,
       time,
       user_id:userid,
      });
      
      await newbatch.save();
     await user.findByIdAndUpdate(userid, { $push: { batchname:newbatch._id } });
     const response= await user.findById(userid).populate('batchname');
   
    res.render('page.ejs',{infos:response});
  
    } catch (error) {
      //console.log(error) 
      res.send('Internal Error') 
    }
});

app.get('/batchdelete/:id',async function(req,res){
    try {
        const id=req.params.id;
        const result= await batch.findByIdAndDelete(id);
     // Delete all students associated with this batch
       const two=  await student.deleteMany({ batch_id: result._id });
     const three= await record.deleteMany({batch_id:result._id});
     // Remove the batch ID from the user's batchname array
     await user.findByIdAndUpdate(result.user_id, { $pull: { batchname: result._id } })

        const response= await user.findById(result.user_id).populate('batchname')
        res.render('page',{infos:response});
    } catch (error) {
      // console.log(error) 
      res.send('Internal error')
    }
})
//batchcreate end


//userdelete start
app.post('/deleteuser/:id', async function (req, res) {
  try {
      const id = req.params.id;

  
          // Delete user by ID
          await user.findByIdAndDelete(id);
          // Delete related data (batch, student, record, etc.)
          await batch.deleteMany({ user_id: id });
          await student.deleteMany({ user_id: id });
          await record.deleteMany({ user_id: id });

          // Redirect to the appropriate page (e.g., homepage)
          res.redirect('/');
    

   
  
  } catch (err) {
      // Handle any errors (e.g., database errors)
      res.send('Internal server error');
  }
});

//userdelete end

//home.ejs t start
app.get('/home/:id',async function(req,res){
    try {
      const id=req.params.id;
      const result= await batch.findById(id).populate('students');
      res.render('home.ejs',{infos:result});
    } catch (error) {
      // console.log(error) 
      res.send('internal Error')
    }
})

//home.ejs end

 //create student which will store in batch schema
app.get('/create/:id', async function(req,res){
  try{
    const id=req.params.id;
   const result= await batch.findById(id);
   //console.log(result);
  res.render('create.ejs',{infos:result});
  }catch(err){
    //console.log(err)
    res.send('error')
  }
})

app.post('/post/:id', async function(req,res){
try {
 const id=req.params.id;
const batchid= await batch.findById(id);
 const {name, clas,phone,fees}=req.body;
 //same same name hole problem hoi ex: student=student
const newstudent = new student({

name:name,
clas:clas,
phone:phone,
fees:fees,
//daysmonth:daysmonth,
batch_id:batchid._id,
user_id:batchid.user_id


});
const result =await newstudent.save();

// Update the user's students array
await batch.findByIdAndUpdate(id, { $push: { students: newstudent._id } });


const response=await batch.findById(id).populate('students');

res.render('home.ejs',{infos:response});


} catch (error) {
 //console.error(error) 
 res.send('Internal Error')  
}

});

// Handle attendance submission
app.post('/result', async (req, res) => {
    try {
        
        const { attendance, id } = req.body; // Get attendance and student ID
       // console.log('Attendance:', attendance);
       // console.log('Student ID:', id);

        const studentRecord = await student.findById(id);
        if (!studentRecord) {
            return res.status(404).send('Student not found');
        }

        // Update attendance count based on the submitted value
        if (attendance === 'present') {
            studentRecord.presentDays += 1;
        } else if (attendance === 'absent') {
            studentRecord.absentDays += 1;
        }

        // Save the updated student record
        const result = await studentRecord.save();
      const one= await student.findById(id);
     const response= await batch.findById(one.batch_id).populate('students');
       res.render('home.ejs',{infos:response});

       // res.redirect('/home'); // Redirect to the desired page after saving
    } catch (error) {
       // console.error(error);
        res.status(500).send('Error updating attendance');
    }
});
//edit id tu lolu
app.get('/edit/:id',async function(req,res){
try {
    const id=req.params.id;
    const result= await student.findById(id);
   // console.log(result)
    if(result._id==id ){
        res.render('update.ejs', {infos:result});
      
    }else{
        return res.status(404).send('Student not found'); 
    }
} catch (error) {
 // console.error(error)  
 res.send('Internal Error')
}

});

app.post('/update/:id', async function(req,res){
try {
   const id=req.params.id;// student id
   const {name,clas,phone,fees, presentDays,absentDays}=req.body;
   const result =await student.findByIdAndUpdate({_id:id},{$set:{name:name,clas:clas,phone:phone,fees:fees, presentDays:presentDays,absentDays:absentDays}});
  // const one= await student.findById(id);
   const response= await batch.findById(result.batch_id).populate('students');
   res.render('home.ejs',{infos:response});
 //res.redirect('/home');
   // res.render('home.ejs',{infos:result});
}catch(error) {
  //  console.error(error)
  res.send('Internal Error')
}

});

app.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;// student id

        // Assuming 'student' and 'user' are your Mongoose models
        const result = await student.findByIdAndDelete(id);
        await batch.findByIdAndUpdate(result.batch_id,{$pull:{students:id}})
       // console.log(result);
       const two= await batch.findById(result.batch_id).populate('students');
       res.render('home.ejs',{infos:two})
           
    } catch (error) {
        console.error(error);
        // Handle the error appropriately (e.g., send an error response)
        res.status(500).send('Error occurred during deletion.');
    }
});


//after every month student record store;
app.post('/record/:id',async function(req,res){
    try{
        const id=req.params.id;
    // const one=await user.findById(id);
    const {month,name,cls,attendance,fees,amount,userid}=req.body;
   const newrecords= new record({
    month:month,
    name:name,
    cls:cls,
    attendance:attendance,
    fees:fees,
    amount:amount,
    batch_id:id,
   user_id:userid,
   });
   
   const result= await newrecords.save();
  // Update the user's students array
const two=await batch.findByIdAndUpdate(id, { $push: {records:newrecords._id}});
//console.log(two);
//const three = await batch.findById(id);

//const response=await user.findById(two.user_id).populate('batchname');

const resulr= await batch.findById(id).populate('students');
//console.log(result);
res.render('home.ejs',{infos:resulr});
 // res.render('page.ejs',{infos:response});
  // res.redirect('/home');


    }catch(err){
    res.status(500).send('Internal Server Error');
       // console.log(err);
    }
});

//find student by their name
app.post('/find', async function(req, res) {
    try {
        const { id,userid,  month } = req.body;
        const batchDetails = await batch.findById(id).populate('records');

        if (!batchDetails) {
            res.send('Invalid batch ID');
            return;
        }

        // Filter records by batch ID, month, and name
        const filteredRecords = batchDetails.records.filter(record => {
            return record.month === month ;
        });
//console.log(filteredRecords)
        res.render('find.ejs', { infos: filteredRecords ,userid:userid});
    } catch (err) {
      //  console.log(err);
        res.status(500).send('An error occurred.');
    }
});




//record.js update koribo hole jot month r data vohrua ase
app.get('/findup/:id', async function(req,res){
    try {
     const id=req.params.id;
     const one= await record.findById(id);
     if(one._id==id){
        res.render('findup.ejs',{infos:one})
     } else{
        res.send('Error please try again')
     }
    } catch (error) {
       // console.log(error)
       res.send('Internal Error')
    }
});
app.post('/submitrecord/:id', async function(req,res){
    try {
      // record student id
        const id=req.params.id;
       const{userid,attendance,fees}=req.body;
       const result= await record.findByIdAndUpdate({_id:id},{$set:{attendance:attendance,fees:fees}});
      // console.log(result);
    
    //  const response = await batch.findById(result.batch_id).populate('students');
   // const response = await batch.findById(result.batch_id);
   const batchDetails = await batch.findById(result.batch_id).populate('records');

   if (!batchDetails) {
       res.send('Invalid batch ID');
       return;
   }

   // Filter records by batch ID, month, and name
   const filteredRecords = batchDetails.records.filter(record => {
       return record.month === result.month ;
   });
   // console.log(response)
     res.render('find.ejs',{infos:filteredRecords,userid:userid});
     //  res.redirect('/home');
    } catch (error) {                                            
      //console.log(error) ;
      res.send('Internal Error')
    }
});

app.get('/finddel/:id', async function(req,res){
    try {
      //record student id
       const id=req.params.id;
       const result= await record.findByIdAndDelete(id);
      // console.log(result)
       const one= await batch.findByIdAndUpdate(result.batch_id,{$pull:{records:result._id}});
      // console.log(one)
      // const response= await batch.findById(one._id).populate('students');
      // console.log(response)
      const batchDetails = await batch.findById(result.batch_id).populate('records');

      if (!batchDetails) {
          res.send('Invalid batch ID');
          return;
      }
   
      // Filter records by batch ID, month, and name
      const filteredRecords = batchDetails.records.filter(record => {
          return record.month === result.month ;
      });

      
     // console.log(filteredRecords)
       res.render('find.ejs',{infos:filteredRecords,userid:filteredRecords.user_id});
       
       
    } catch (error) {
      //console.log(error) 
      res.send('Internal Error') ;
    }
});





let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}



app.listen(3000,function(){
    console.log('server is running bro')
})