const express = require("express");
const route = express.Router();
const CouponControl = require("../controllers/CouponControler");
const { authMiddlware, isAdmin } = require("../middelwares/authMiddleware");


route.post("/", authMiddlware, isAdmin, CouponControl.createCoupon)
route.get("/", authMiddlware, isAdmin, CouponControl.getallCoupon)
route.put("/:id", authMiddlware, isAdmin, CouponControl.updateCoupon)
route.delete("/:id", authMiddlware, isAdmin, CouponControl.DeleteCoupon)

module.exports= route