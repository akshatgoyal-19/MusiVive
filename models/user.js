const mongoose=require("mongoose");
const { use } = require("passport");
const passportLocalMongoose=require("passport-local-mongoose")

const userSchema= new mongoose.Schema({
    username:String,
    email:String,
});

userSchema.plugin(passportLocalMongoose)

module.exports= mongoose.model("User",userSchema)