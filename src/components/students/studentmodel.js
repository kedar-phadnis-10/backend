const {model,Schema} =require('mongoose');
const ObjectId = Schema.Types.ObjectId;
const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    collegeId:{
        type:ObjectId,
        //required:true
    },
    skills:[{
        type:String
    }]
})

exports.Student = model("Student",StudentSchema);