const express=require("express")
const route=express.Router()
const Productcontroler=require("../controllers/ProductContrl")
const {isAdmin, authMiddlware , } = require('../middelwares/authMiddleware')


route.post("/", authMiddlware , isAdmin  ,Productcontroler.CreateProduct )
route.get("/getallproduct" ,Productcontroler.getAllProduct )
route.get("/:id" , authMiddlware , isAdmin ,Productcontroler.getaProduct )
route.delete("/:id" , authMiddlware , isAdmin ,Productcontroler.DeleteProduct)
route.put("/:id" ,  authMiddlware , isAdmin , Productcontroler.UpdateProduct )






module.exports=route