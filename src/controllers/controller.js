const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')


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


