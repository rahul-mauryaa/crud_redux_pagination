const model = require("../model/student");
const mongoose = require("mongoose");
const Student = model.Student;

exports.getAllStudents = async (req, res) => {
  // const students = await Student.find().sort({ rollno: 1 });
  // res.status(200).json(students);
  // console.log(students);

  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const skip = (page - 1) * size;

    const total = await Student.countDocuments();
    const students = await Student.find().skip(skip).limit(size);

    res.json({
      records: students,
      total,
      page,
      size,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getStudent = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const student = await Student.find({ rollno: id });
  res.json(student);
  console.log(student);
};

exports.createStudents = (req, res) => {
  try {
    const student = new Student(req.body);
    student.save();
    console.log(student);
    res.send(student);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Student.findOneAndDelete({ rollno: id });
    res.status(200).json(result);
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Student.findOneAndUpdate({ rollno: id }, req.body, {
      new: true,
    });
    res.status(201).json(result);
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
