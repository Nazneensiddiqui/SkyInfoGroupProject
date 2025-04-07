const Coupon = require("../models/CouponModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");


const createCoupon = asyncHandler(async(req,res)=>{
    try {
     const newCoupon = await Coupon.create(req.body) ;
     res.json(newCoupon)  
    } catch (error) {
      throw new Error(error)  
    }
})

const getallCoupon = asyncHandler(async(req,res)=>{
    try {
     const getallCoupon = await Coupon.find() ;
     res.json(getallCoupon)  
    } catch (error) {
      throw new Error(error)  
    }
})

const updateCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
     const coupon = await Coupon.findByIdAndUpdate(id,
        req.body , {
            new:true,
        }
     ) ;
     res.json(coupon)  
    } catch (error) {
      throw new Error(error)  
    }
})

const DeleteCoupon = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    validateMongoDbId(id)
    try {
     const deletecoupon = await Coupon.findByIdAndDelete(id) ;
     res.json(deletecoupon)  
    } catch (error) {
      throw new Error(error)  
    }
})

module.exports = {
    createCoupon,
    getallCoupon,
    updateCoupon,
    DeleteCoupon
}