
const { default: mongoose } = require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require("../models/internModel.js")

const { value, regForName, regForFullName, regForLink, regForEmail, regForMobileNo, valid } = require("../validation/validation.js")

const createCollege = async function (req, res) {
    try {
        let data = req.body
        let { name, fullName, logoLink } = data
        
        if (!name) { return res.status(400).send({ status: false, message: "name field is mandatory" }) }
        if (!fullname) { return res.status(400).send({ status: false, message: "fullname field is mandatory" }) }
        if (!logoLink) { return res.status(400).send({ status: false, message: "logoLink field is mandatory" }) }

        //---------checking the mandatory fields------------------
        // if (!(name && fullName)) { return res.status(400).send({ status: false, message: "all fields are mandatory" }) }
        //-----------convert everything into lowerCase------------
        name = name.trim().toLowerCase()
        fullName = fullName.trim()

        //-------------------checkduplicatevalue---------------------//
        let checkDuplicateName = await collegeModel.findOne({ name: name })
        if (checkDuplicateName) { return res.status(400).send({ status: false, message: "the name is exist please provide another college name" }) }

        let checkDuplicatefullName = await collegeModel.findOne({ fullName: fullName })
        if (checkDuplicatefullName) { return res.status(400).send({ status: false, message: "the fullName is already exists provide another collegeName" }) }

        // let checkDuplicate = await collegeModel.findOne( {$or: [{ name: name} ,{fullName:fullName}] })

        //-------validation of name------------
        if (!(valid(name))) { return res.status(400).send({ status: false, message: "provide a valid name" }) }
        if (!(regForName(name))) { return res.status(400).send({ status: false, message: "invalid name" }) }
        //---------validation of fullname---------

        if ((valid(fullName) == false)) { return res.status(400).send({ status: false, message: "provide a valid fullname" }) }
        // console.log(regForFullName(fullName))
        if ((regForFullName(fullName) == false)) { return res.status(400).send({ status: false, message: "Fullname can contain only Alphabets, commas and spaces!" }) }
        //------validation of logo link--------------------------
        if ((valid(logoLink) == false)) { return res.status(400).send({ status: false, message: "provide a valid logo link" }) }
        if (regForLink(logoLink) == false) { return res.status(400).send({ status: false, message: "invalid link" }) }
        //  console.log(regForLink(logoLink))
        req.body.name = name
        req.body.fullName = fullName
        // req.body.logoLink=logoLink
        //console.log(req.body)

        //-------creating college data-------------
        let collegeData = await collegeModel.create(req.body)

        //  console.log(collegeData)
        res.status(201).send({ status: true, data: collegeData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

///2-----------------------createIntern-----------------------
const createIntern = async function (req, res) {
    try{
        const userInput = req.body
        const { name, mobile, email, collegeName } = userInput

        if (!name) { res.status(400).send({ status: false, message: "Name Is required" }) }
        if (!mobile) { res.status(400).send({ status: false, message: "mobile Is required" }) }
        if (!email) { res.status(400).send({ status: false, message: "email Is required" }) }
        //name = name.trim().toLowerCase()
        //---------------------validation of name-----------------------------
        // if (!(valid(name))) { return res.status(400).send({ status: false, message: "provide a valid name" }) }
        if ((regForName(name) == false)) { return res.status(400).send({ status: false, message: "invalid name" }) }
        //-----------------------validation of email---------------------------------------
        if (regForEmail(email) == false) { return res.status(400).semd({ status: false, mrssage: "provide a valid email" }) }
        //-----------------validation of mobile number--------------------------
        if ((regForMobileNo(mobile) == false)) { return res.status(400).send({ status: false, message: "provide a valid mobile number" }) }
        //-----------------validation of college name---------
        console.log(regForMobileNo(mobile))
        if (req.body.collegeName) {

           
            let collegeNamef= collegeName.trim().toLowerCase()
            console.log(collegeName)
            if (!valid(req.body.collegeName)) { res.status(400).send({ status: false, message: "enter valid collegeName" }) }
            let present = await collegeModel.findOne({ name: collegeNamef })
            if (!present) return res.status(404).send({ status: false, message: "college name not present" })
            let id = present._id.toString()
            req.body.collegeId = id
            req.body.name = name
            console.log(present)
            const internCreated = await internModel.create(req.body)
            return res.status(201).send({ status: true, message: "intern created succesfully", data: internCreated })


        } else if (req.body.collegeId) {
            let valid = mongoose.Types.ObjectId.isValid(req.body.collegeId)
            if (!valid) { return res.statud(400).send({ status: false, message: "objectId is invalid" }) }

            const present = await collegeModel.findOne({ _id: req.body.collegeId })

            if (!present) return res.status(404).send({ status: false, message: "collegeId is not present" })
            console.log(present)


            const internCreated = await internModel.create(req.body)
            return res.status(201).send({ status: true, message: "intern created succesfully", data: internCreated })

        } else {
            return res.status(400).send({ status: false, message: "collegeId or collegeName must be present" })
        }
    }catch(error) {
        return res.status(500).send({status:false,message:error.message})
    }
    }
  
    

//------------------getcollegeDetails----------------------------
const getcollegeData = async function (req, res) {
    try {
        const input1 = req.query.collegeName  //iith

        if (!input1) { res.status(400).send({ status: false, message: "Please enter collegeName in queryParam" }) }

        //Dbcall for getting the CollegeId from Name
        let collegeDetail = await collegeModel.findOne({name:input1})
        if(!collegeDetail) return res.status(400).send({status:false,msg:"college not found"})
        let id=collegeDetail._id.toString()

        //-------------Dbcall for grtting internlist from collegeId--------------
        const internList = await internModel.find({collegeId:id})
        console.log(internList)
        let obj={}
        obj.interns=internList
        // collegeDetail.interns = internList
        obj.name=collegeDetail.fullName
        obj.id=collegeDetail._id
        res.status(200).send({ status: true, data: obj })

        // if(!result){res.status(404).send({status:false , message:"Details not found."})}

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.getcollegeData = getcollegeData