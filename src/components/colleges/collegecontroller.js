const { Student } = require('../students/studentmodel');
const { colleges, courses } = require('./collegeData');
const {College} = require('./collegemodel');

exports.getCollegesByName = (req,res)=>{
    const {name} = req.body;

}

exports.getCollegeById = async(req,res)=>{
    const {id} = req.params;
    const collegeDetails = (await College.findById(id).exec()).toJSON();
    const collegeStudents = (await Student.find({collegeId:id}).exec()).map(student=>student.toJSON());
    const similarColleges = (await College.find({$or:[{state:collegeDetails.state},{courses:{$in:collegeDetails.courses}}]}).exec()).map(college=>college.toJSON());
    // console.log(collegeDetails);
    res.status(200).json({collegeStudents,collegeDetails,similarColleges});

}

exports.insertColleges = (req,res)=>{
    let collegesData = [...colleges];
    let coursesData = courses;
    let collegesList = [];
    collegesData.forEach(college=>{
        const randomLength = Math.ceil(Math.random()*2);
        const randomStartIndex = Math.floor(Math.random()*93);
        let course = coursesData.slice(randomStartIndex,randomStartIndex+randomLength);
        let arr = course.map(c=>c.name);
        college.courses = arr;
        college.numStudents = 100;
        collegesList.push(new College(college));
    })

    College.insertMany(collegesList).then(()=>{
        res.status(201).send();
    }).catch(err=>{
        res.status(400).send();
    })
}

exports.getColleges = (req,res)=>{
    if(req.query?.name){
        const name = req.query?.name;
        College.find({$text:{$search:name}}).then(response=>{
            const colleges = response.map(r=>r.toJSON());
            res.status(200).json(colleges);
        })
    }else{
        College.find().exec().then(response=>{
            const colleges = response.map(r=>r.toJSON());
            res.status(200).json(colleges);
        })
    }
}
