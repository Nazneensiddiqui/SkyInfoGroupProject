const express=require("express")
const route=express.Router()
const Productcontroler=require("../controllers/ProductContrl")
const {isAdmin, authMiddlware , } = require('../middelwares/authMiddleware')
const{ productImgResize, UploadPhoto, } = require("../middelwares/uploadImages")

route.put("/upload", authMiddlware, isAdmin , UploadPhoto.array("images", 10),
productImgResize, Productcontroler.uploadImages )
route.post("/", authMiddlware , isAdmin  ,Productcontroler.CreateProduct )
route.get("/" ,Productcontroler.getAllProduct )
route.put("/wishlist" ,  authMiddlware  , Productcontroler.AddToWishlist )
route.put("/rating" ,  authMiddlware  , Productcontroler.Rating )
route.get("/:id" , authMiddlware , isAdmin ,Productcontroler.getaProduct )
route.delete("/:id" , authMiddlware , isAdmin ,Productcontroler.DeleteProduct)
route.delete("/delete-img/:id" , authMiddlware , isAdmin ,Productcontroler.deleteImage)
route.put("/:id" ,  authMiddlware , isAdmin , Productcontroler.UpdateProduct )







module.exports=route