const express=require("express")
const route=express.Router()
const BrandControler=require("../controllers/branControl")
const {isAdmin, authMiddlware , } = require('../middelwares/authMiddleware')


route.post("/" ,authMiddlware, BrandControler.createBrand)

route.put("/:id", authMiddlware , BrandControler.UpdateBrand)
route.delete("/:id", authMiddlware , BrandControler.deleteBrand)
route.get("/:id" , BrandControler.getBrand)
route.get("/" , BrandControler.getAllBrand)






module.exports=route