require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const studentRouter = require('./routes/student')

app.use(cors())
app.use(express.json());

const database = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};
database();

app.use('/students',studentRouter.router);
// app.get("/students", async(req, res) => {
//     const students = await Student.find();
//   res.send(students);
// });

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/`);
});
