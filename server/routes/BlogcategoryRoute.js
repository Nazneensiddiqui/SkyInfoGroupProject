const express=require("express")
const route=express.Router()
const CategoryControler=require("../controllers/blogCategoryContr")
const {isAdmin, authMiddlware , } = require('../middelwares/authMiddleware')


route.post("/" ,authMiddlware, CategoryControler.createCategory)

route.put("/:id", authMiddlware , CategoryControler.UpdateCategory)
route.delete("/:id", authMiddlware , CategoryControler.deleteCategory)
route.get("/:id" , CategoryControler.getCategory)
route.get("/" , CategoryControler.getAllCategory)






module.exports=route