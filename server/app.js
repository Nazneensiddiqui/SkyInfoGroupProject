const express=require("express")
const app=express();
require("dotenv").config()
const cors=require("cors")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const cookieParser= require("cookie-parser")
const morgan = require("morgan")

const port=process.env.PORT
const dbconn=process.env.DBCONN

const UserRoute=require("./routes/userRoute");
const ProductRoute = require("./routes/ProductRoutes");
const BlogRoute = require("./routes/BlogRouter")
const CategoryRoute = require("./routes/ProdcategoryRoute")
const BlogCategoryRoute = require("./routes/BlogcategoryRoute")
const BrandRoute = require("./routes/BrandRoute")
const CouponRoute = require("./routes/CouponRoute")

const { ErrorHandler, NotFound } = require("./middelwares/errorHandler");


mongoose.connect(dbconn).then((res)=>{
    console.log("DB Connect Successfully")
})

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/user", UserRoute)
app.use("/api/product", ProductRoute)
app.use("/api/blog", BlogRoute)
app.use("/api/category", CategoryRoute)
app.use("/api/blogcategory", BlogCategoryRoute)
app.use("/api/brand", BrandRoute)
app.use("/api/coupon", CouponRoute)

app.use(NotFound);
app.use(ErrorHandler)

app.listen(port, ()=>{
    console.log(`server Run on ${port}` )
})
