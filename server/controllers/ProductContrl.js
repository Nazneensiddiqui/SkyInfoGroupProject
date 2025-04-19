const Product = require("../models/ProductModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const slugify = require("slugify");
const ValidateMongoDbId = require("../utils/validateMongodbId");
const {cloudinaryUploadImg , cloudinaryDeleteImg} = require("../utils/Cloudinery");
 const fs = require("fs");
const path = require("path");



const CreateProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
});

const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
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

const UpdateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const UpdateProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.json(UpdateProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const DeleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteProduct = await Product.findByIdAndDelete(id)
        res.json(deleteProduct)
    } catch (error) {
        throw new Error(error)
    }
});

const AddToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
        const user = await User.findById(_id);
        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);
        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(_id,
                {
                    $pull: { wishlist: prodId },
                },
                { new: true }
            );
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { wishlist: prodId }
                },
                {
                    new: true,
                }
            );
            res.json(user)
        }
    } catch (error) {
        throw new Error(error)
    }
});

const Rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString());
        if (alreadyRated) {

            const updateRating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated }
                },
                {
                    $set: { "ratings.$.star": star , "ratings.$.comment": comment }
                },
                {
                    new: true,
                }
            );
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment:comment,
                            postedby: _id,
                        }
                    }
                },
                { new: true }
            );
        }

        const getallRating = await Product.findById(prodId);
        let totalRating = getallRating.ratings.length;
        let ratingSum = getallRating.ratings.map((item)=> item.star)
        .reduce((prev , curr)=> prev + curr , 0);
        let actualRating = Math.round(ratingSum / totalRating);
        let finalProduct = await Product.findByIdAndUpdate(
            prodId,
            {
            totalRating : actualRating
            },
            {new : true}
        );
       return res.json(finalProduct)

    } catch (error) {
        throw new Error(error)
    }
})


//upload Images:
const uploadImages = asyncHandler(async (req, res) => {

    const { id } = req.params;
    ValidateMongoDbId(id);
    
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
       if (!files || !Array.isArray(files)) {
            return res.status(400).json({ message: "No files uploaded or wrong format" });
        }
       for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
             fs.unlinkSync(path);
        }


        const findProduct = await Product.findByIdAndUpdate(
            id,
            {
                images: urls.map((file) => file),
            },
            { new: true }
        );

        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});


const deleteImage = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const deleted = cloudinaryDeleteImg(id, "images");
        res.json({message: "Deleted"})
    } catch (error) {
       throw new Error(error) 
    }
})




module.exports = {
    CreateProduct,
    getaProduct,
    getAllProduct,
    UpdateProduct,
    DeleteProduct,
    AddToWishlist,
    Rating,
    uploadImages ,
    deleteImage
}