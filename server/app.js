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
const { ErrorHandler, NotFound } = require("./middelwares/errorHandler");
const ProductRoute = require("./routes/ProductRoutes");

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

app.use(NotFound);
app.use(ErrorHandler)

app.listen(port, ()=>{
    console.log(`server Run on ${port}` )
})
