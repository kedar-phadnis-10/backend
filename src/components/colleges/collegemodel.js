const {model,Schema} = require('mongoose');

const CollegeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    numStudents:{
        type:Number,
        required:true
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    courses:[{
        type:String
    }]
})

exports.College = model("College",CollegeSchema);