const User= require("../models/userModel")
const asyncHandler=require("express-async-handler");
const { generateToken } = require("./jwtToken");
const ValidateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("./refreshToken");
const jwt= require("jsonwebtoken");
const { sendEmail } = require("./emailContrl");

 
const createUser = asyncHandler(async(req, res)=>{
   const email= req.body.email;
   const findUser= await User.findOne({email:email});
   if(!findUser){
    //create a new User
    const newUser= await User.create(req.body);
    res.json(newUser)
   }else{
    throw new Error("User Already Exists!!")

   }
})

const loginUserCtrl= asyncHandler(async(req,res)=>{
  
    const{email, password}=req.body;
   //cheak if user exists or not
   const findUser= await User.findOne({email:email});
   if(findUser && await findUser.isPasswordMatched(password)){
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser= await User.findByIdAndUpdate(findUser.id,
      {refreshToken:refreshToken,},{new:true}
    );
    res.cookie("refreshToken" , refreshToken,{
      httpOnly:true,
      maxAge:72*60*60*1000
    })
res.json({
    _id:findUser?._id,
    firstname:findUser?.firstname,
    lastname:findUser?.lastname,
    email:findUser?.email,
    mobile:findUser?.mobile,
    token:generateToken(findUser?._id)
})
   }else{
    throw new Error ("Invalid Credentials")
   }
})

//get all user
const getallUser=asyncHandler(async(req, res )=>{
    try {
        const getUsers= await User.find()
        res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})

// Get a Single User

const GetaUser= asyncHandler(async (req, res)=>{
    const {id}= req.params;
    ValidateMongoDbId(id)
  try {
    const getaUser= await User.findById(id);
    res.json(getaUser)
  } catch (error) {
    throw new Error(error)
  }
});

const deleteUser= asyncHandler(async (req, res)=>{
    const {id}= req.params;
    ValidateMongoDbId(id);
  try {
    const deleteUser= await User.findByIdAndDelete(id);
    res.json(deleteUser)
  } catch (error) {
    throw new Error(error)
  }
});

const updatedUser=asyncHandler(async(req,res)=>{
  const _id = req.user;
  ValidateMongoDbId(id)
    try {
       const UpdatedUser= await User.findByIdAndUpdate( _id, {
        firstname:req?.body?.firstname,
        lastname:req?.body?.lastname,
        email:req?.body?.email,
        mobile: req?.body?.mobile
     },
     {
            new:true,
 }
    );
    res.json(UpdatedUser) 
    } catch (error) {
     throw new Error(error)   
    }
})

const BlockedUser =asyncHandler(async(req, res)=>{
  const{id}=req.params;
 ValidateMongoDbId(id) 
 
  try {
    const block= await User.findByIdAndUpdate(
      id,{
        isBlocked:true,
      },
      {new:true,
      }
   )
   res.json(block);
  } catch (error) {
    throw new Error(error);
  }
});
const UnblockedUser=asyncHandler(async(req,res)=>{
  const{id}=req.params;
  ValidateMongoDbId(id)
  try {
    const Unblock= await User.findByIdAndUpdate(
      id,{
        isBlocked:false,
      },
      {new:false,
      }
    )
    res.json({message:"User UnBlocked"});
  } catch (error) {
    throw new Error(error);
  }
});

//handle Refresh Token
const handleRefreshToken =  asyncHandler(async(req,res)=>{
const cookie=req.cookies;
console.log(cookie);

if(!cookie?.refreshToken) throw new Error("No Refresh Token in cookies")
  const refreshToken = cookie.refreshToken;
console.log(refreshToken);

const user = await User.findOne({refreshToken});
if(!user) throw new Error("No Refresh Token Present in db or no matched");
jwt.verify(refreshToken, process.env.JWT_SECRET,(err, decoded)=>{
console.log(decoded)
if (err || user.id !== decoded.id) {
  throw new Error("There is somethink wrong with refresh token")
}

// Generate new Access Token
const newAccessToken = generateToken(user?.id)
res.json({ accessToken: newAccessToken });
});
})

// logout function
const logout = asyncHandler(async(req,res)=>{
const cookie = req.cookies;
if(!cookie?.refreshToken) throw new Error("No Refresh Token in cookies")
  const refreshToken = cookie.refreshToken;
const user = await User.findOne({refreshToken});
if(!user){
  res.clearCookie("refreshToken",{
    httpOnly: true,
    secure: true
  })
 return res.sendStatus(204); //forbidden
}
await User.findOneAndUpdate({refreshToken:refreshToken}, {refreshToken: "",})
res.clearCookie("refreshToken",{
  httpOnly: true,
  secure: true
});

return res.sendStatus(204); //forbidden
});


const updatePassword = asyncHandler(async(req, res)=>{
  const {_id}= req.user;
  const {password} = req.body;
  ValidateMongoDbId(_id);
  const user = await User.findById(_id);
  if(password){
    user.password = password;
    const updatePassword = await user.save();
    res.json(updatePassword);
  }else{
    res.json({ success: true, message: "Password updated successfully" })
  }
 
});

// const ForgotPasswordToken= asyncHandler(async(req,res)=>{
//   const {email}= req.body;
//   const user = await User.findOne({email:email});
//   if(!user)throw new Error("User not found with this email");
//   try {
//     const token = await user.createPasswordResetToken();
//     await user.save();
//     const resetUrl = `Hi Please follow this link to reset your password. this link is valid in 10 minutes <a>localhost:8000/api/user/change-password${token}`;
//     const data = {
//       to:email,
//       text:"Hey User",
//       subject: "Forgot password Link",
//       html:resetUrl
//     };
//     sendEmail(data);
//     res.json(token)
//   } catch (error) {
//     throw new Error(error)
//   }
// })

const ForgotPasswordToken = asyncHandler(async (req, res) => {
  // Check if request body exists
  if (!req.body || !req.body.email) {
      return res.status(400).json({ message: "Email is required" });
  }

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
      throw new Error("User not found with this email");
  }

  try {
      const token = await user.createPasswordResetToken(); // Generate reset token
      await user.save(); // Save token in DB

      const resetUrl = `
          <p>Hi,</p>
          <p>Please follow this link to reset your password. This link is valid for 10 minutes:</p>
          <a href="http://localhost:8000/api/user/change-password/${token}">Reset Password</a>
      `;

      const data = {
          to: email,
          text: "Hey User",
          subject: "Forgot Password Link",
          html: resetUrl
      };

      await sendEmail(data); // Ensure sendEmail is an async function

      res.status(200).json({ success: true, message: "Password reset email sent successfully", token });

  } catch (error) {
      throw new Error(error);
  }
});




module.exports={
    createUser,
    loginUserCtrl,
    getallUser,
    GetaUser,
    deleteUser,
    updatedUser,
    BlockedUser,
    UnblockedUser,
    handleRefreshToken,
    logout,
    updatePassword,
    ForgotPasswordToken
}