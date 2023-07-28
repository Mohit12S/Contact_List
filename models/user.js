const mongoose = require('mongoose');
// Importing Multer for file upload
const multer = require('multer');
const path = require('path');
// To join path we are writing below code
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    }
},{
    timestamps : true
});


// Got it from Multer documentation
// It is storing the filePath
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null,file.fieldname + '_' + Date.now());
    }
})

// Creating static functions part of OOPS 
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User' , userSchema);
module.exports = User;