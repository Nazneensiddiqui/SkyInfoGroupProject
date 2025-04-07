// const cloudinary = require("cloudinary");

// cloudinary.config({
//     upload_preset:  process.env.SECRET_KEY,
//     Cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY
// });



// const cloudinaryUploadImg = async(fileToUploads) =>{
//     return new Promise((resolve)=>{
//         cloudinary.uploader.upload(fileToUploads , (result)=>{
//             resolve(
//                 {
//                     url: result.secure_url,
//                 },
//                 {
//                     resource_type : "auto",
//                 }
//             );
//         });
//     });

// }

// module.exports = cloudinaryUploadImg


const cloudinary = require("cloudinary").v2;
require("dotenv").config(); // Make sure this is present

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET, // ✅ Required
});

// const cloudinaryUploadImg = async (fileToUpload) => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(
//             fileToUpload,
//             { resource_type: "auto" },
//             (error, result) => {
//                 if (error) reject(error);
//                 else resolve({ url: result.secure_url });
//             }
//         );
//     });
// };

const cloudinaryUploadImg = async (fileToUpload) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(fileToUpload, { folder: "images" }, (error, result) => {
        if (error) reject(error);
        else resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      });
    });
  };
  

module.exports = cloudinaryUploadImg;
