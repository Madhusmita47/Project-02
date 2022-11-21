const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const internModel=("../models/internModel.js")

const { value,regForName,regForFullName,regForLInk,regForEmail,regForMobileNo,valid}=require("../validation/validation.js")

const createCollege=async function(req,res){
    try{
        let data=req.body
        let {name,fullName,logoLink}=data
        //---------checking the mandatory fields------------------
        if(!(name && fullName && logoLink))
        return res.status(400).send({status:false,message:"all fields are mandatory"})
        //----checkduplicatevalue------
        let checkDuplicate=await findOne({name:data.name})
        if(checkDuplicate)
        return res.status(400).send({status:false,message:"the name is exist please provide another college name"})

        //-------validation of name------------
        if(!(valid(name))) return res.status(400).send({status:false,message:"provide a valid name"})
        if(!(regForName(name))) return res.status(400).send({status:false,message:"invalid name"})
        //---------validation of fullname---------
        if(!(valid(fullName))) return res.status(400).send({status:false,message:"provide a valid fullname"})
        if(!(regForFullName(regForFullName))) return res.status(400).send({status:false,message:"invalid fullname first letter should be in upper case"})
        //------validation of logo link---------
        if(!(valid(logoLink))) return res.status(400).send({status:false,message:"provide a valid logo link"})
        if(!(valid(regForLInk))) return res.status(400).send({status:false,message:"invalid link"})
        //----validation 

       //-------creating college data-------------
    let collegeData=await collegeModel.create(data)
   //let obj={name:collegeSchema.name,fullName:collegeSchema.fullName,logoLink:collegeSchema.logoLink,isDeleted:collegeSchema.isDeleted}
    res.status(201).send({status:true,data:collegeData})
    }
    catch(error){
        return res.status(500).send({status:false,message:error.messege})
    }

}




///2
const createIntern= async function(req,res){

    const userInput=req.body
    const{name,mobile,email,collegeName}=userInput

   if(!name){res.status(400).send({status:false,message:"Name Is required"})}
   if(!mobile){res.status(400).send({status:false,message:"mobile Is required"})}
   if(!email){res.status(400).send({status:false,message:"email Is required"})}
   if(!collegeName){res.status(400).send({status:false,message:"collegeName Is Required"})}
  
   if(!valid(name)){res.status(400).send({status:false,message:"enter valid name"})}
   if(!valid(collegeName)){res.status(400).send({status:false,message:"enter valid collegeName"})}

   const id= await collegeModel.find(collegeName)
   id._id=collegeId

   userInput.collegeId=collegeId

    const internCreated =await internModel.create(userInput)
    return res.status(201).send({status:true,message:"intern created succesfully",data:internCreated})
}














//3
const Handler3 = async function (req, res) {
    const input1 = req.query.collegeName  //iith

    if (!input1) { res.status(200).send({ status: false, message: "Please enter collegeName in queryParam" }) }

    //Dbcall for getting the CollegeId from Name
    const collegeDetail = await collegeModel.find(input1)

    //Dbcall for grtting internlist from collegeId
    const internList = await internModel.findById({ collegeId: collegeDetail._id })

    collegeDetail.interns = internList

    res.status(200).send({ status: true, data: collegeDetail })

    // if(!result){res.status(404).send({status:false , message:"Details not found."})}

}



module.exports=createCollege
module.exports=createIntern