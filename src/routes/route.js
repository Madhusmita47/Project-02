const express=require("express")
const router=express.Router()
const {createCollege,createIntern,getCollegeData}=require("../controllers/Controller.js")
const controllers=require("../controllers/controller")

//--------------create college data------------------
router.post("/functionup/colleges", createCollege)
//---------------create intern data----------------
router.post("/functionup/interns",controllers.createIntern)
//--------------get collegedetails----------
router.get("/functionup/collegeDetails",controllers.getcollegeData)











module.exports = router; 
