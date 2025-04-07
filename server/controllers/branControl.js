const Brand = require("../models/BrandModel");
const asyncHandler = require("express-async-handler");
const validateMogoDbId = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async(req,res)=>{
    try {
       const newBrand = await Brand.create(req.body)
       res.json(newBrand) 
    } catch (error) {
       throw new Error(error) 
    }
});

const UpdateBrand = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const updateBrand = await Brand.findByIdAndUpdate(id , req.body , {new: true,})
      res.json(updateBrand) 
   } catch (error) {
      throw new Error(error) 
   }
});

const deleteBrand = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const deleteBrand = await Brand.findByIdAndDelete(id)
      res.json(deleteBrand) 
   } catch (error) {
      throw new Error(error) 
   }
});

const getBrand = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const getaBrand = await Brand.findById(id)
      res.json(getaBrand) 
   } catch (error) {
      throw new Error(error) 
   }
});


const getAllBrand = asyncHandler(async(req,res)=>{
   try {
      const getallBrand = await Brand.find()
      res.json(getallBrand) 
   } catch (error) {
      throw new Error(error) 
   }
});


module.exports = {
   createBrand,
   UpdateBrand,
   deleteBrand,
   getBrand,
   getAllBrand
   
}