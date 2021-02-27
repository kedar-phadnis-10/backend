const {Student} = require('./studentmodel');
const {College}  = require('../colleges/collegemodel')
const {students} = require('./studentData');
const { courses } = require('../colleges/collegeData');
exports.insertStudent = (req,res)=>{
    let student = new Student(req.body);
    student.save((err,response)=>{
        if(err){
            console.log(err);
        }else{
            console.log(response.toJSON());
            res.status(201).json(response.toJSON());
        }
    })
}

exports.insertStudentsByCollegeId = (req,res)=>{
    let studentsData = [...students];
    let studentsList = [];
    let coursesData = courses;

    College.find().exec().then(response=>{
        response.forEach(college=>{
            let cid = college._id;
            let startIndex = Math.floor(Math.random()*900);
            let curStudents = studentsData.slice(startIndex,startIndex+100);
            curStudents.forEach(student=>{
                student.collegeId = cid;
                const randomLength = Math.ceil(Math.random()*2);
                const randomStartIndex = Math.floor(Math.random()*93);
                let course = coursesData.slice(randomStartIndex,randomStartIndex+randomLength);
                let arr = course.map(c=>c.name);
                student.skills = arr;
                studentsList.push(new Student(student));
            })
        })
        Student.insertMany(studentsList).then(()=>{
            res.status(200).send();
        }).catch(err=>{
            res.status(400).send();
        })
    })
}


exports.findStudentsByCollegeId = (req,res)=>{
    const id = req.params.id;
    let students = [];
    Student.find({collegeId:id}).exec().then(response=>{
        console.log(response.length);
        students = response.map(r=>r.toJSON());
        res.status(200).json(students);
    }).catch(err=>{

    })
}


exports.getStudentById = (req,res)=>{
    const id = req.params.id;
    Student.findById(id).exec().then(response=>{
        res.status(200).json(response.toJSON());
    }).catch(err=>{

    })
}
