const Enquiry = require("../models/enqModel");
const asyncHandler = require("express-async-handler");
const validateMogoDbId = require("../utils/validateMongodbId");

const createEnquiry = asyncHandler(async(req,res)=>{
    try {
       const newEnquiry = await Enquiry.create(req.body)
       res.json(newEnquiry) 
    } catch (error) {
       throw new Error(error) 
    }
});

const UpdateEnquiry = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const updateEnquiry = await Enquiry.findByIdAndUpdate(id , req.body , {new: true,})
      res.json(updateEnquiry) 
   } catch (error) {
      throw new Error(error) 
   }
});

const deleteEnquiry = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const deleteEnquiry = await Enquiry.findByIdAndDelete(id)
      res.json(deleteEnquiry) 
   } catch (error) {
      throw new Error(error) 
   }
});

const getEnquiry = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const getaEnquiry = await Enquiry.findById(id)
      res.json(getaEnquiry) 
   } catch (error) {
      throw new Error(error) 
   }
});


const getAllEnquiry = asyncHandler(async(req,res)=>{
   try {
      const getallEnquiry = await Enquiry.find()
      res.json(getallEnquiry) 
   } catch (error) {
      throw new Error(error) 
   }
});


module.exports = {
   createEnquiry,
   UpdateEnquiry,
   deleteEnquiry,
   getEnquiry,
   getAllEnquiry
   
}