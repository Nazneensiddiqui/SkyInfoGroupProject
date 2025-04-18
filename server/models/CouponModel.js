const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var CouponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        uppercase: true,
    },
    expiry:{
        type:Date,
        required:true,
      
    },
    discount:{
        type:String,
        required:true,
      
    },
});

//Export the model
module.exports = mongoose.model('coupon', CouponSchema);