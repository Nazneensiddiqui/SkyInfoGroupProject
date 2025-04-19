const Color = require("../models/colorModel");
const asyncHandler = require("express-async-handler");
const validateMogoDbId = require("../utils/validateMongodbId");

const createColor = asyncHandler(async(req,res)=>{
    try {
       const newColor = await Color.create(req.body)
       res.json(newColor) 
    } catch (error) {
       throw new Error(error) 
    }
});

const UpdateColor = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const updateColor = await Color.findByIdAndUpdate(id , req.body , {new: true,})
      res.json(updateColor) 
   } catch (error) {
      throw new Error(error) 
   }
});

const deleteColor = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const deleteColor = await Color.findByIdAndDelete(id)
      res.json(deleteColor) 
   } catch (error) {
      throw new Error(error) 
   }
});

const getColor = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const getaColor = await Color.findById(id)
      res.json(getaColor) 
   } catch (error) {
      throw new Error(error) 
   }
});


const getAllColor = asyncHandler(async(req,res)=>{
   try {
      const getallColor = await Color.find()
      res.json(getallColor) 
   } catch (error) {
      throw new Error(error) 
   }
});


module.exports = {
   createColor,
   UpdateColor,
   deleteColor,
   getColor,
   getAllColor
   
}