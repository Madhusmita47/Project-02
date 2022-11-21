const mongoose=require("mongoose")


const collegeSchema=new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        unique:true,
        trim :true
    },
    fullName:{
        type:String,
        required:true,
        unique:true,
    },
    logoLink:{
        type:String,
        required:true,
        unique:true
        },
    isDeleted:{
        type:Boolean,
        default:false
    }
 }, {timestamps:true}
);
module.exports=model.Schema("College",collegeSchema)







