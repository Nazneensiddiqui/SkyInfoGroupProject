const express = require("express");
const route = express.Router();
const blogController = require("../controllers/BlogControl");
const { authMiddlware, isAdmin } = require("../middelwares/authMiddleware");
const { blogImgResize, UploadPhoto } = require("../middelwares/uploadImages");

route.post("/" , authMiddlware,isAdmin,blogController.createBlog)
route.put("/likes", authMiddlware, blogController.LikeBlog)
route.put("/upload/:id",
 authMiddlware, isAdmin , UploadPhoto.array("images", 2),
blogImgResize, blogController.uploadImages )
route.put("/dislikes", authMiddlware, blogController.DisLikeBlog)
route.put("/:id" , authMiddlware,isAdmin,blogController.UpdateBlog)
route.get("/:id" ,blogController.getBlog)
route.get("/" ,blogController.getAllBlog)
route.delete("/:id" , authMiddlware,isAdmin, blogController.DeleteBlog)

module.exports=route