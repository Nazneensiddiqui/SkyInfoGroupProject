const Product = require("../models/ProductModel");
const asyncHandler=require("express-async-handler");
const slugify=require("slugify")

const CreateProduct = asyncHandler(async(req,res)=>{
try {
    if(req.body.title){
        req.body.slug=slugify(req.body.title)
    }
  const newProduct = await Product.create(req.body) 
  res.json(newProduct) 
} catch (error) {
  throw new Error(error)  
}
});

const getaProduct = asyncHandler(async(req,res)=>{
   const {id}= req.params;
    try {
 const findProduct = await Product.findById(id)
        res.json(findProduct)
    } catch (error) {
        throw new Error(error)
    }
});

const getAllProduct = asyncHandler(async (req, res, next) => {
    try {
        // 1️⃣ Filtering
        let queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

        let query = Product.find(JSON.parse(queryStr)); // ✅ Use `let` to allow modification

        // 2️⃣ Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt"); // Default sorting
        }

        // 3️⃣ Field Limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" "); // ✅ Fixed typo (`fileds` -> `fields`)
            query = query.select(fields);
        } else {
            query = query.select("-__v"); // Exclude MongoDB's `__v` field
        }

        // 4️⃣ Pagination
        const page = Number(req.query.page) || 1; // ✅ Default to page 1
        const limit = Number(req.query.limit) || 10; // ✅ Default to limit 10
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) {
                throw new Error("This page does not exist.");
            }
        }

        // 5️⃣ Execute Query
        const products = await query;

        // 6️⃣ Send Response
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error); // ✅ Pass error to global error handler
    }
});

const UpdateProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const UpdateProduct = await Product.findByIdAndUpdate(id, req.body , {
            new:true,
        })
        res.json(UpdateProduct)
    } catch (error) {
       throw new Error(error) 
    }
})

const DeleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const deleteProduct = await Product.findByIdAndDelete(id)
        res.json(deleteProduct)
    } catch (error) {
       throw new Error(error) 
    }
});





module.exports={
CreateProduct,
getaProduct,
getAllProduct,
UpdateProduct,
DeleteProduct
}