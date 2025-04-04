const mongoose = require("mongoose")
const ValidateMongoDbId = (id)=>{
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error ("This ;is not Valid or not Found")
};
module.exports= ValidateMongoDbId;