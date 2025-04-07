const express=require("express")
const route=express.Router()
const UserControler=require("../controllers/userContrl")
const { authMiddlware, isAdmin } = require("../middelwares/authMiddleware")

route.post("/register", UserControler.createUser)
route.post("/login",UserControler.loginUserCtrl)
route.post("/admin-login",UserControler.loginAdmin)
route.post("/cart",authMiddlware ,UserControler.UserCart)
route.post("/cart/applycoupon", authMiddlware, UserControler.ApplyCoupon)
route.post("/cart/cash-order", authMiddlware, UserControler.createOrder)
route.post("/forget-password-token",UserControler.ForgotPasswordToken)

route.put("/reset-password/:token",UserControler.resetPassword)
route.put("/password",authMiddlware, UserControler.updatePassword)
route.get("/all-users",UserControler.getallUser)
route.get("/refresh", UserControler.handleRefreshToken)
route.get("/wishlist" ,authMiddlware, UserControler.getWishlist)
route.post("/cart-user" ,authMiddlware, UserControler.getUsercart)
route.get("/logout", UserControler.logout)
route.get("/:id" ,authMiddlware,isAdmin, UserControler.GetaUser)

route.delete("/empty-cart", authMiddlware, UserControler.emptyCart);
route.delete("/:id",UserControler.deleteUser)
route.put("/edit-user",authMiddlware, UserControler.updatedUser)
route.put("/save-address",authMiddlware, UserControler.SaveAddress)
route.put("/block-user/:id",authMiddlware, UserControler.BlockedUser)
route.put("/unblock-user/:id",authMiddlware, UserControler.UnblockedUser)


module.exports=route