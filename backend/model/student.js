const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    rollno: {type: Number, required: true, unique: true} ,
    name: String,
    last_name: String,
    city:String,
    dob:{type:Date , default: Date.now},
    gender:{type:String, require : true},
    hobbies:{type:Array , require:true}
  });
  exports.Student = mongoose.model('student',studentSchema);
  
