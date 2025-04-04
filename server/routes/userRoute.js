const express=require("express")
const route=express.Router()
const UserControler=require("../controllers/userContrl")
const { authMiddlware, isAdmin } = require("../middelwares/authMiddleware")

route.post("/register", UserControler.createUser)
route.post("/login",UserControler.loginUserCtrl)
route.post("/forget-password-token",UserControler.ForgotPasswordToken)
route.put("/password",authMiddlware, UserControler.updatePassword)
route.get("/all-users",UserControler.getallUser)
route.get("/refresh", UserControler.handleRefreshToken)
route.get("/logout", UserControler.logout)
route.get("/:id" ,authMiddlware,isAdmin, UserControler.GetaUser)
route.delete("/:id",UserControler.deleteUser)
route.put("/edit-user",authMiddlware,isAdmin, UserControler.updatedUser)
route.put("/block-user/:id",authMiddlware, UserControler.BlockedUser)
route.put("/unblock-user/:id",authMiddlware, UserControler.UnblockedUser)


module.exports=route