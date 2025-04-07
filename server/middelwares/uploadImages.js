// // const multer = require("multer");
// // const path = require("path");

// // //  1. Define multer storage
// // const multerStorage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "./public/images"); // You can change the folder as needed
// //   },
// //   filename: function (req, file, cb) {
// //     const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
// //     cb(null, uniqueName);
// //   },
// // });

// // //  2. Fix typo in multer filter
// // const multerFilter = (req, file, cb) => {
// //   if (file.mimetype.startsWith("image")) {
// //     cb(null, true); // Fixed spelling of true
// //   } else {
// //     cb({ message: "Unsupported file format" }, false);
// //   }
// // };

// // // 3. Fix 'Storage' to 'storage' (case sensitive)
// // const UploadPhoto = multer({
// //     storage: multerStorage,
// //   fileFilter: multerFilter,
// //   limits: { fieldSize: 2000000 },
// // });

// // //  4. Resize image for product
// // const productImgResize = async (req, res, next) => {
// //   if (!req.files) return next();
// //   await Promise.all(
// //     req.files.map(async (file) => {
// //       await 
// //         resize(300, 300)
// //         .toFormat("jpeg")
// //         .jpeg({ quality: 90 })
// //         .toFile(`public/images/products/${file.filename}`);
// //     })
// //   );
// //   next();
// // };

// // //  5. Resize image for blog
// // const blogImgResize = async (req, res, next) => {
// //   if (!req.files) return next();
// //   await Promise.all(
// //     req.files.map(async (file) => {
// //       await 
// //         resize(300, 300)
// //         .toFormat("jpeg")
// //         .jpeg({ quality: 90 })
// //         .toFile(`public/images/blogs/${file.filename}`);
// //     })
// //   );
// //   next();
// // };

// // module.exports = {
// //   UploadPhoto,
// //     productImgResize,
// //   blogImgResize,
// // };


// const multer = require("multer");
// const path = require("path");
// const sharp = require("sharp"); 
// // const fs = require("fs");

// // 1. Define multer storage
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
//     cb(null, uniqueName);
//   },
// });

// // 2. File filter
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Unsupported file format"), false);
//   }
// };


// // 3. Multer upload config
// const UploadPhoto = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: { fieldSize: 2000000 },
// });

// // 4. Resize image for product
// const productImgResize = async (req, res, next) => {
//   if (!req.files || req.files.length === 0) return next();

//   await Promise.all(
//     req.files.map(async (file) => {
//       await sharp(file.path)
//         .resize(300, 300)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/images/products/${file.filename}`);

//       // Optional: delete original uncompressed image
//       // fs.unlinkSync(file.path);
//     })
//   );

//   next();
// };

// // 5. Resize image for blog
// const blogImgResize = async (req, res, next) => {
//   if (!req.files || req.files.length === 0) return next();

//   await Promise.all(
//     req.files.map(async (file) => {
//       await sharp(file.path)
//         .resize(300, 300)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/images/blogs/${file.filename}`);

//       // fs.unlinkSync(file.path);
//     })
//   );

//   next();
// };

// module.exports = {
//   UploadPhoto,
//   productImgResize,
//   blogImgResize,
// };

const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

// 1. Define allowed image types
const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];

// 2. Multer storage config
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// 3. Multer filter to allow only image files
const multerFilter = (req, file, cb) => {
  console.log("🔍 File mimetype received:", file.mimetype); // Debug line

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file format"), false);
  }
};

// 4. Configure multer upload
const UploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});

// 5. Resize product images
const productImgResize = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);

      // Optional: delete original uploaded file to save space
      fs.unlinkSync(`public/images/products/${file.filename}`);
    })
  );

  next();
};

// 6. Resize blog images
const blogImgResize = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/blogs/${file.filename}`);
       fs.unlinkSync(`public/images/blogs/${file.filename}`);
    })
  );

  next();
};

module.exports = {
  UploadPhoto,
  productImgResize,
  blogImgResize,
};
