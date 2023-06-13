const express = require('express');
const studentController = require('../controller/student');

const router = express.Router();

router
  .post('/',studentController.createStudents)
  .get('/', studentController.getAllStudents)
  .get('/:id',studentController.getStudent)
  .delete('/:id',studentController.deleteStudent)
  .patch('/:id',studentController.updateStudent)



exports.router = router;  