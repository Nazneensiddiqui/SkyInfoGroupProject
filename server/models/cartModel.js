const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var CartSchema = new mongoose.Schema({
   products:[
    {
        product:{
            type : mongoose.Schema.Types.ObjectId,
            ref:"product",
        },
        count: Number,
        color: String,
        price: Number,
    }
   ],
   cartTotal: Number,
   totalAfterDiscount: Number,
   orderby:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
   },
},
{
    timestamps: true
}
);

//Export the model
module.exports = mongoose.model('cart', CartSchema);