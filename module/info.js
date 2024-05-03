import mongoose from 'mongoose';


//user
//const userSchema= new mongoose.Schema({
  // name:String,
   // email:String,
   // password:String,

//});






const studentSchema= new mongoose.Schema({
    name:String,
    clas:Number,
    month:String,
    fees:Number,
    daysmonth:Number,
    presentDays: { type: Number,default:0 },
    absentDays: { type: Number,default:0 },
// Add a virtual field for total attendance
// studentSchema.virtual('totalAttendance').get(function () {
   // return this.presentDays + this.absentDays;

});

const recordSchema= new mongoose.Schema({
    month:String,
    name:String,
    cls:Number,
    attendance:Number,
    fees:String,
    amount:Number,
   
});

 //const user= mongoose.model('user', userSchema);
const record=mongoose.model('record',recordSchema);
const student=mongoose.model('student',studentSchema);
export  {student, record}
//export default student 