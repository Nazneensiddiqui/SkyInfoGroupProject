const express=require("express")
const route=express.Router()
const ColorControler=require("../controllers/ColorControl")
const {isAdmin, authMiddlware , } = require('../middelwares/authMiddleware')


route.post("/" ,authMiddlware, ColorControler.createColor)

route.put("/:id", authMiddlware , ColorControler.UpdateColor)
route.delete("/:id", authMiddlware , ColorControler.deleteColor)
route.get("/:id" , ColorControler.getColor)
route.get("/" , ColorControler.getAllColor)






module.exports=route