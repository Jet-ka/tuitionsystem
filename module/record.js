
import mongoose from 'mongoose';
//user
const userSchema = new mongoose.Schema({
    name: {type:String,trim:true},
    email: String,
    phone:Number,
    state:String,
    location:String,
    password: {type:String,trim:true},
    batchname:[{ type: mongoose.Schema.Types.ObjectId, ref: 'batch' }],
   // students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
   
  });
  
  const user = mongoose.model('user', userSchema);
//reset 
// Reset token schema for temporary storage
const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  expiration: {
    type: Date,
    required: true
  }
});

const ResetToken = mongoose.model('ResetToken', resetTokenSchema);
  // batch
  const batchSchema = new mongoose.Schema({
    name: String, //batch name
    time:String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'student' }],
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: 'record' }],
    user_id:{type:mongoose.Schema.Types.ObjectId ,ref: 'user'}
  });
  
  const batch = mongoose.model('batch', batchSchema);
  
 
//student
  const studentSchema = new mongoose.Schema({
    name: String,
    clas: Number,
    phone: Number,
    fees: Number,
 //   daysmonth: Number,
    presentDays: { type: Number, default: 0 },
    absentDays: { type: Number, default: 0 },
   batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'batch' },
   user_id:{type:mongoose.Schema.Types.ObjectId ,ref: 'user'}
  });
  
  const student = mongoose.model('student', studentSchema);

  
//record
const recordSchema = new mongoose.Schema({
  month: String,
  name: { type: String, default: 'Unknown' },
  cls: { type: Number, default: 0 },
  attendance: { type: Number, default: 0 },
  fees: { type: String, default: 'Not specified' },
  amount: { type: Number, default: 0 },
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'batch' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
});


const record = mongoose.model('record', recordSchema);

  const currentSchema = new mongoose.Schema({
  day:String,
  topic:String,
  
  
  });

  const current=mongoose.model('current',currentSchema);


  
  
  export {user,batch,student,record,ResetToken,current};