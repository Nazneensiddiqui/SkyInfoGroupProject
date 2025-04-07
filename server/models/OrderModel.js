const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var OrderSchema = new mongoose.Schema({
  products:[
    {
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "product",
        },
        count:Number,
        color: String,
    },
  ],
  paymentIntent:{},
  orderStatus:{
    type:String,
    default: "Not Processed",
    enum : [
        "Not Processed",
        "Cash on Delivery",
        "Processing",
        "Dispatched",
       " Cancelled",
        "Delivered",
    ],
  },
  orderby:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user",
  },
},
{
    timestamps: true,
}
);

//Export the model
module.exports = mongoose.model('order', OrderSchema);