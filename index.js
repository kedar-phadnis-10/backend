const express=require('express')
require('./src/components/config/db')
const app=express()
const bp=require('body-parser');
const cors = require('cors');
const { insertStudent, insertStudentsByCollegeId, findStudentsByCollegeId, getStudentById } = require('./src/components/students/studentcontroller')
const { insertColleges, getCollegeById, getColleges } = require('./src/components/colleges/collegecontroller')
app.use(bp.json())
app.use(cors())
// app.post('/student',insertStudent)
// app.post('/mockstudents',insertStudentsByCollegeId)

app.get('/colleges/:id',getCollegeById);
app.get('/colleges',getColleges);
app.listen(5000)
