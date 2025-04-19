// const User= require("../models/userModel")
// const Product = require("../models/ProductModel");
// const Cart = require("../models/cartModel")
// const asyncHandler=require("express-async-handler");
// const { generateToken } = require("./jwtToken");
// const ValidateMongoDbId = require("../utils/validateMongodbId");
// const { generateRefreshToken } = require("./refreshToken");
// const jwt= require("jsonwebtoken");
// const { sendEmail } = require("./emailContrl");
// const crypto=require("crypto")
 
// const createUser = asyncHandler(async(req, res)=>{
//    const email= req.body.email;
//    const findUser= await User.findOne({email:email});
//    if(!findUser){
//     //create a new User
//     const newUser= await User.create(req.body);
//     res.json(newUser)
//    }else{
//     throw new Error("User Already Exists!!")

//    }
// })

// //login user
// const loginUserCtrl= asyncHandler(async(req,res)=>{
  
//     const{email, password}=req.body;
//    //cheak if user exists or not
//    const findUser= await User.findOne({email:email});
//    if(findUser && await findUser.isPasswordMatched(password)){
//     const refreshToken = await generateRefreshToken(findUser?._id);
//     const updateUser= await User.findByIdAndUpdate(findUser.id,
//       {refreshToken:refreshToken,},{new:true}
//     );
//     res.cookie("refreshToken" , refreshToken,{
//       httpOnly:true,
//       maxAge:72*60*60*1000
//     })
// res.json({
//     _id:findUser?._id,
//     firstname:findUser?.firstname,
//     lastname:findUser?.lastname,
//     email:findUser?.email,
//     mobile:findUser?.mobile,
//     token:generateToken(findUser?._id)
// })
//    }else{
//     throw new Error ("Invalid Credentials")
//    }
// })


// //login Admin

// const loginAdmin= asyncHandler(async(req,res)=>{
  
//   const{email, password}=req.body;
//  //cheak if user exists or not
//  const findAdmin= await User.findOne({email:email});
//  if(findAdmin.role !== 'admin') throw new Error("Not Authrization")
//  if(findAdmin && await findAdmin.isPasswordMatched(password)){
//   const refreshToken = await generateRefreshToken(findAdmin?._id);
//   const updateUser= await User.findByIdAndUpdate(findAdmin.id,
//     {refreshToken:refreshToken,},{new:true}
//   );
//   res.cookie("refreshToken" , refreshToken,{
//     httpOnly:true,
//     maxAge:72*60*60*1000
//   })
// res.json({
//   _id:findAdmin?._id,
//   firstname:findAdmin?.firstname,
//   lastname:findAdmin?.lastname,
//   email:findAdmin?.email,
//   mobile:findAdmin?.mobile,
//   token:generateToken(findAdmin?._id)
// })
//  }else{
//   throw new Error ("Invalid Credentials")
//  }
// });

// //save user Address
// const SaveAddress = asyncHandler(async(req,res)=>{
//   const {_id}=req.user;
//   ValidateMongoDbId(_id);
//   try {
//    const updateUser = await User.findByIdAndUpdate(
//     _id,
//     {
//       address: req?.body?.address,
//     },
//     {new:true}
//    );
//    res.json(updateUser)
//   } catch (error) {
//     throw new Error(error)
//   }
// })


// //get all user
// const getallUser=asyncHandler(async(req, res )=>{
//     try {
//         const getUsers= await User.find()
//         res.json(getUsers)
//     } catch (error) {
//         throw new Error(error)
//     }
// })

// // Get a Single User

// const GetaUser= asyncHandler(async (req, res)=>{
//     const {id}= req.params;
//     ValidateMongoDbId(id)
//   try {
//     const getaUser= await User.findById(id);
//     res.json(getaUser)
//   } catch (error) {
//     throw new Error(error)
//   }
// });

// const deleteUser= asyncHandler(async (req, res)=>{
//     const {id}= req.params;
//     ValidateMongoDbId(id);
//   try {
//     const deleteUser= await User.findByIdAndDelete(id);
//     res.json(deleteUser)
//   } catch (error) {
//     throw new Error(error)
//   }
// });

// const updatedUser=asyncHandler(async(req,res)=>{
//   const _id = req.user;
//   ValidateMongoDbId(id)
//     try {
//        const UpdatedUser= await User.findByIdAndUpdate( _id, {
//         firstname:req?.body?.firstname,
//         lastname:req?.body?.lastname,
//         email:req?.body?.email,
//         mobile: req?.body?.mobile
//      },
//      {
//             new:true,
//  }
//     );
//     res.json(UpdatedUser) 
//     } catch (error) {
//      throw new Error(error)   
//     }
// })

// const BlockedUser =asyncHandler(async(req, res)=>{
//   const{id}=req.params;
//  ValidateMongoDbId(id) 
 
//   try {
//     const block= await User.findByIdAndUpdate(
//       id,{
//         isBlocked:true,
//       },
//       {new:true,
//       }
//    )
//    res.json(block);
//   } catch (error) {
//     throw new Error(error);
//   }
// });
// const UnblockedUser=asyncHandler(async(req,res)=>{
//   const{id}=req.params;
//   ValidateMongoDbId(id)
//   try {
//     const Unblock= await User.findByIdAndUpdate(
//       id,{
//         isBlocked:false,
//       },
//       {new:false,
//       }
//     )
//     res.json({message:"User UnBlocked"});
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// //handle Refresh Token
// const handleRefreshToken =  asyncHandler(async(req,res)=>{
// const cookie=req.cookies;
// console.log(cookie);

// if(!cookie?.refreshToken) throw new Error("No Refresh Token in cookies")
//   const refreshToken = cookie.refreshToken;
// console.log(refreshToken);

// const user = await User.findOne({refreshToken});
// if(!user) throw new Error("No Refresh Token Present in db or no matched");
// jwt.verify(refreshToken, process.env.JWT_SECRET,(err, decoded)=>{
// console.log(decoded)
// if (err || user.id !== decoded.id) {
//   throw new Error("There is somethink wrong with refresh token")
// }

// // Generate new Access Token
// const newAccessToken = generateToken(user?.id)
// res.json({ accessToken: newAccessToken });
// });
// })

// // logout function
// const logout = asyncHandler(async(req,res)=>{
// const cookie = req.cookies;
// if(!cookie?.refreshToken) throw new Error("No Refresh Token in cookies")
//   const refreshToken = cookie.refreshToken;
// const user = await User.findOne({refreshToken});
// if(!user){
//   res.clearCookie("refreshToken",{
//     httpOnly: true,
//     secure: true
//   })
//  return res.sendStatus(204); //forbidden
// }
// await User.findOneAndUpdate({refreshToken:refreshToken}, {refreshToken: "",})
// res.clearCookie("refreshToken",{
//   httpOnly: true,
//   secure: true
// });

// return res.sendStatus(204); //forbidden
// });


// const updatePassword = asyncHandler(async(req, res)=>{
//   const {_id}= req.user;
//   const {password} = req.body;
//   ValidateMongoDbId(_id);
//   const user = await User.findById(_id);
//   if(password){
//     user.password = password;
//     const updatePassword = await user.save();
//     res.json(updatePassword);
//   }else{
//     res.json({ success: true, message: "Password updated successfully" })
//   }
 
// });



// const ForgotPasswordToken = asyncHandler(async (req, res) => {
//   // Check if request body exists
//   if (!req.body || !req.body.email) {
//       return res.status(400).json({ message: "Email is required" });
//   }

//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//       throw new Error("User not found with this email");
//   }

//   try {
//       const token = await user.createPasswordResetToken(); // Generate reset token
//       await user.save(); // Save token in DB

//       const resetUrl = `
//           <p>Hi,</p>
//           <p>Please follow this link to reset your password. This link is valid for 10 minutes:</p>
//           <a href="http://localhost:8000/api/user/change-password/${token}"> Reset Password </a>
//       `;

//       const data = {
//           to: email,
//           text: "Hey User",
//           subject: "Forgot Password Link",
//           html: resetUrl
//       };

//       await sendEmail(data); // Ensure sendEmail is an async function

//       res.status(200).json({ success: true, message: "Password reset email sent successfully", token });

//   } catch (error) {
//       throw new Error(error);
//   }
// });

// const resetPassword = asyncHandler(async(req,res)=>{
//   const {password}=req.body;
//   const{token}= req.params;
//   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
//   const user = await User.findOne({passwordResetToken:hashedToken,
//     passwordResentExpires:{$gt: Date.now()},
//   });
//   if(!user)throw new Error("Token Expired Please try again later");
//   user.password = password ;
//   user.passwordResetToken = undefined;
//   user.passwordResentExpires = undefined;
//   await user.save();
//   res.json(user)
// })

// const getWishlist = asyncHandler(async(req ,res)=>{
//   const {_id} = req.user;
//   ValidateMongoDbId(_id)
//   try {
//     const findUser = await User.findById(_id).populate("wishlist");
//     res.json(findUser)
//   } catch (error) {
//     throw new Error(error)
//   }
// }) ;

// // const UserCart = asyncHandler(async(req,res)=>{
// // const {cart}=req.body;
// // const {_id}=req.user;
// // ValidateMongoDbId(_id)
// // try {
// //   let Products =[];
// //   const user = await User.findById(_id);
// //   //check if user already have product in cart
// //   const alreadyExistCart = await Cart.findOne({orderId: user._id});
// //   if(alreadyExistCart){
// //     alreadyExistCart.remove();
// //   };

// //   for(let i=0; i<cart.length; i++){
// //     let object = {};
// //     object.product = cart[i]._id;
// //     object.count = cart[i].count;
// //     object.color = cart[i].color;
// //     let getPrice = await Product.findById(cart[i]._id).select("price").exec();
// //     object.price = getPrice.price;
// //     Products.push(object);
// // }
// // let cartTotal =0;
// // for(let i=0; i< Products.length; i++){
// //   cartTotal = cartTotal + Products[i].price * Products[i].count;
// // }
// // let newCart = await new Cart({
// //   Products,
// //   cartTotal,
// //   orderby:user?._id,
// // }).save();
// // res.json(newCart)
 
// // } catch (error) {
// //   throw new Error(error)
// // }
// // })

// const UserCart = asyncHandler(async (req, res) => {
//   const { cart } = req.body;
//   const { _id } = req.user;
//   ValidateMongoDbId(_id);

//   try {
//     let Products = [];
//     const user = await User.findById(_id);

//     // Check if user already has a cart
//     const alreadyExistCart = await Cart.findOne({ orderby: user._id });
//     if (alreadyExistCart) {
//       await Cart.deleteOne({ _id: alreadyExistCart._id }); // 🔥 Fix here
//     }

//     for (let i = 0; i < cart.length; i++) {
//       let object = {};
//       object.product = cart[i]._id;
//       object.count = cart[i].count;
//       object.color = cart[i].color;

//       let getPrice = await Product.findById(cart[i]._id).select("price").exec();
//       if (!getPrice) {
//         throw new Error(`Product not found with id: ${cart[i]._id}`);
//       }

//       object.price = getPrice.price;
//       Products.push(object);
//     }

//     let cartTotal = 0;
//     for (let i = 0; i < Products.length; i++) {
//       cartTotal += Products[i].price * Products[i].count;
//     }
//     let newCart = await new Cart({
//       products: Products, // 👈 fixed here
//       cartTotal,
//       orderby: user._id,
//     }).save();

//     res.json(newCart);
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// const getUsercart = asyncHandler(async(req,res)=>{
// const {_id}=req.user;
// ValidateMongoDbId(_id);
// try {
//   const cart = await Cart.findOne({orderId: _id}).populate(
//     "products.product");
//   res.json(cart)
// } catch (error) {
//   throw new Error(error)
// }
// });

// const emptyCart = asyncHandler(async(req,res)=>{
//   const {_id}=req.user;
//   ValidateMongoDbId(_id);
//   try {
//     const user = await User.findOne({_id});
//     const cart = await Cart.findOneAndDelete({orderId: _id})
//     res.json(cart)
//   } catch (error) {
//     throw new Error(error)
//   }
//   });





// module.exports={
//     createUser,
//     loginUserCtrl,
//     loginAdmin,
//     SaveAddress,
//     getallUser,
//     GetaUser,
//     deleteUser,
//     updatedUser,
//     BlockedUser,
//     UnblockedUser,
//     handleRefreshToken,
//     logout,
//     updatePassword,
//     ForgotPasswordToken,
//     resetPassword,
//     getWishlist,
//     UserCart,
//     getUsercart,
//     emptyCart
// }


const User = require("../models/userModel");
const Product = require("../models/ProductModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/BlogModel")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("./jwtToken");
const ValidateMongoDbId = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("./refreshToken");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailContrl");
const crypto = require("crypto");
const { isValidObjectId } = require("mongoose");
const Order = require("../models/OrderModel");
const uniqid = require("uniqid")

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Already Exists!");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = generateRefreshToken(findUser._id);
    await User.findByIdAndUpdate(findUser._id, { refreshToken }, { new: true });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findUser._id,
      firstname: findUser.firstname,
      lastname: findUser.lastname,
      email: findUser.email,
      mobile: findUser.mobile,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findAdmin = await User.findOne({ email });

  if (!findAdmin || findAdmin.role !== "admin") {
    throw new Error("Not Authorized");
  }

  if (await findAdmin.isPasswordMatched(password)) {
    const refreshToken = generateRefreshToken(findAdmin._id);
    await User.findByIdAndUpdate(findAdmin._id, { refreshToken }, { new: true });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.json({
      _id: findAdmin._id,
      firstname: findAdmin.firstname,
      lastname: findAdmin.lastname,
      email: findAdmin.email,
      mobile: findAdmin.mobile,
      token: generateToken(findAdmin._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

const SaveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  ValidateMongoDbId(_id);

  const updateUser = await User.findByIdAndUpdate(
    _id,
    { address: req.body.address },
    { new: true }
  );

  res.json(updateUser);
});

const getallUser = asyncHandler(async (req, res) => {
  const getUsers = await User.find();
  res.json(getUsers);
});

const GetaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  ValidateMongoDbId(id);
  const user = await User.findById(id);
  res.json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  ValidateMongoDbId(id);
  const deletedUser = await User.findByIdAndDelete(id);
  res.json(deletedUser);
});

const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  ValidateMongoDbId(_id);

  const updated = await User.findByIdAndUpdate(
    _id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      mobile: req.body.mobile,
    },
    { new: true }
  );

  res.json(updated);
});

const BlockedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  ValidateMongoDbId(id);

  const blocked = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
  res.json(blocked);
});

const UnblockedUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  ValidateMongoDbId(id);

  await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
  res.json({ message: "User Unblocked" });
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) throw new Error("No Refresh Token in cookies");
  const refreshToken = cookie.refreshToken;

  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No Refresh Token present or not matched");

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("Invalid refresh token");
    }

    const accessToken = generateToken(user._id);
    res.json({ accessToken });
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in cookies");

  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });

  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }

  await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return res.sendStatus(204);
});

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  ValidateMongoDbId(_id);

  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updated = await user.save();
    res.json(updated);
  } else {
    res.json({ success: false, message: "No password provided" });
  }
});

const ForgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const token = await user.createPasswordResetToken();
  await user.save();

  const resetUrl = `
    <p>Hi,</p>
    <p>Reset your password using the link below (valid for 10 mins):</p>
    <a href="http://localhost:8000/api/user/change-password/${token}">Reset Password</a>
  `;

  await sendEmail({
    to: email,
    text: "Hey User",
    subject: "Password Reset",
    html: resetUrl,
  });

  res.status(200).json({ success: true, message: "Password reset email sent", token });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResentExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token expired or invalid");

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResentExpires = undefined;
  await user.save();

  res.json({ success: true, message: "Password successfully reset" });
});

const getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  ValidateMongoDbId(_id);

  const user = await User.findById(_id).populate("wishlist");
  res.json(user);
});

const UserCart = asyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  ValidateMongoDbId(_id);

  const user = await User.findById(_id);
  await Cart.findOneAndDelete({ orderby: user._id });

  let products = [];
  for (let item of cart) {
    const productDetails = await Product.findById(item._id).select("price");
    if (!productDetails) throw new Error("Product not found");

    products.push({
      product: item._id,
      count: item.count,
      color: item.color,
      price: productDetails.price,
    });
  }

  const cartTotal = products.reduce((sum, item) => sum + item.count * item.price, 0);

  const newCart = await Cart.create({
    products,
    cartTotal,
    orderby: user._id,
  });

  res.json(newCart);
});

const getUsercart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  ValidateMongoDbId(_id);

  const cart = await Cart.findOne({ orderby: _id }).populate("products.product");
  res.json(cart);
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
   ValidateMongoDbId(_id);   

  const user = await User.findById(_id);
  const cart =await Cart.findOneAndDelete({ orderby: _id });

  res.status(200).json({
    success: true,
    message: "Cart emptied successfully",
    data: cart,
  });
});


const ApplyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
ValidateMongoDbId(_id)

  // 1. Validate coupon
  const validCoupon = await Coupon.findOne({ name: coupon });
  if (validCoupon ===null){ throw new Error("Invalid Coupon")}

  // 2. Get user cart
  const user = await User.findById(_id);
  let {products, cartTotal} = await Cart.findOne(
    { orderby:user._id}).populate("products.product");

    let totalAfterDiscount= (cartTotal-(cartTotal*validCoupon.discount)/100).toFixed(2);
    await Cart.findOneAndUpdate(
      {orderby: user._id},
      {totalAfterDiscount},
      {new:true}
    );
    res.json(totalAfterDiscount)
});

const createOrder = asyncHandler(async(req,res)=>{
  const {COD , couponApplied} = req.body
  const {_id} = req.user;
  ValidateMongoDbId(_id);
  try {
    if(!COD) throw new Error("Create cash order failed");
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({orderby: user._id});
    let finalAmount = 0;
    if(couponApplied && userCart.totalAfterDiscount){
      finalAmount = userCart.totalAfterDiscount;
    }else{
      finalAmount = userCart.cartTotal;
    }

    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(), 
        method: "COD",
        amount : finalAmount,
        status : "Cash On Delivery",
        created: Date.now(),
        currency:"usd"
      },
orderby: user._id,
orderStatus : "Cash On Delivery",
    }).save();
    let update = userCart.products.map((item)=>{
      return {
        updateOne : {
          filter :{_id : item.product._id},
          update:{$inc: { Quantity : -item.count, sold: +item.count}}
        }
      };
    });

    const updated = await Product.bulkWrite(update,{});
    res.json({message : "success"})
  } catch ({error}) {
    throw new Error("Something went wrong while applying the coupon");
  }
});

const getOrders  = asyncHandler(async(req,res)=>{
  const {_id}= req.user;
  ValidateMongoDbId(_id);
  try {
    const userOrders =  await  Order.findOne({orderby: _id}).populate("products.product").exec()
    res.json(userOrders)
  } catch (error) {
    throw new Error (error)
  }
});

const updateOrderStatus   = asyncHandler(async(req,res)=>{
   const {status}= req.body;
   const {id} =req.params; 
   ValidateMongoDbId(_id);
  try {
    const updateOrderstatus =  await  Order.findByIdAndUpdate(id , {
      orderStatus : status,
      paymentIntent:{
        status : status,
      },
    },
  {
    new : true
  })
    res.json(userOrders)
  } catch (error) {
    throw new Error (error)
  }
});





module.exports = {
  createUser,
  loginUserCtrl,
  loginAdmin,
  SaveAddress,
  getallUser,
  GetaUser,
  deleteUser,
  updatedUser,
  BlockedUser,
  UnblockedUser,
  handleRefreshToken,
  logout,
  updatePassword,
  ForgotPasswordToken,
  resetPassword,
  getWishlist,
  UserCart,
  getUsercart,
  emptyCart,
  ApplyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus
};
