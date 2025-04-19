const express=require("express")
const route=express.Router()
const EnquiryControler=require("../controllers/enqControl")
const {isAdmin, authMiddlware , } = require('../middelwares/authMiddleware')


route.post("/", EnquiryControler.createEnquiry)

route.put("/:id", authMiddlware , EnquiryControler.UpdateEnquiry)
route.delete("/:id", authMiddlware , EnquiryControler.deleteEnquiry)
route.get("/:id" , EnquiryControler.getEnquiry)
route.get("/" , EnquiryControler.getAllEnquiry)






module.exports=route
