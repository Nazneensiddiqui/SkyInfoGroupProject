const Category = require("../models/ProdCategoryModels");
const asyncHandler = require("express-async-handler");
const validateMogoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async(req,res)=>{
    try {
       const newCategory = await Category.create(req.body)
       res.json(newCategory) 
    } catch (error) {
       throw new Error(error) 
    }
});

const UpdateCategory = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   Vali
   try {
      const updateCategory = await Category.findByIdAndUpdate(id , req.body , {new: true,})
      res.json(updateCategory) 
   } catch (error) {
      throw new Error(error) 
   }
});

const deleteCategory = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const deleteCategory = await Category.findByIdAndDelete(id)
      res.json(deleteCategory) 
   } catch (error) {
      throw new Error(error) 
   }
});

const getCategory = asyncHandler(async(req,res)=>{
   const {id} = req.params;
   validateMogoDbId(id)
   try {
      const getaCategory = await Category.findById(id)
      res.json(getaCategory) 
   } catch (error) {
      throw new Error(error) 
   }
});


const getAllCategory = asyncHandler(async(req,res)=>{
   try {
      const getallCategory = await Category.find()
      res.json(getallCategory) 
   } catch (error) {
      throw new Error(error) 
   }
});


module.exports = {
   createCategory,
   UpdateCategory,
   deleteCategory,
   getCategory,
   getAllCategory
   
}