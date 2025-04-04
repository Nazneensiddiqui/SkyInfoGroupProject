const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
       trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
       
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String, 
        require:true,

    },
    brand:{
        type:String,
        require:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    sold:{
        type:Number,
        default:0,
    },
    images:{
        type:Array,
    },
    color:{
        type:String,
        require:true,
    },
    ratings:[{
        star:Number,
        postedby:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
    }]
    
},
{ timestamps: true });

//Export the model
module.exports = mongoose.model('product', ProductSchema);