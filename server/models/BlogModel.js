const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    numViews: {
      type: Number,
      required: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
   
    author: {
      type: String,
      default: "Admin",
    },
    image: [],
  },
  {
    timestamps: true, // ✅ Correct placement
    toJSON: { virtuals: true }, // ✅ Correct placement
    toObject: { virtuals: true }, // ✅ Correct placement
  }
);

// Export the model
module.exports = mongoose.model("Blog", blogSchema);
