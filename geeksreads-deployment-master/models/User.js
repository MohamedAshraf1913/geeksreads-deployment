const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
ObjectId = mongoose.Schema.Types.ObjectId;
const UserSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  UserEmail: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true
  },
  UserBirthDate: {
    type: Date,
    default: "00\00\0000"
  },
  UserPassword: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024

  },
  Photo :{
    type: String,
    default: "",
    minlength: 0,
    maxlength: 1024
  },
  FollowingAuthorId:{
    type:"array",
    "items":{
      type:String
    }
  },
  FollowingUserId:{
    type:"array",
    "items":{
      type:String
    }
  },
  FollowersUserId:{
    type:"array",
    "items":{
      type:String
    }
  },
  OwnedBookId:{
    type:"array",
    "items":{
      type:String
    }
  },
  LikedComment:{
    type:"array",
    "items":{
      type:String
    }
  },
  LikedReview:{
    type:"array",
    "items":{
      type:String
    }
  },
  RatedBooks:[{
    bookId:{
      type:ObjectId
    },
    rating:{
      type:Number
    }
  }]
  /*{
    type:"array",
    "items":{
      type:String
    }
  }*/
  ,
  Read:{
    type:"array",
    "items":{
      type:String
    }
  },
  WantToRead:{
    type:"array",
    "items":{
      type:String
    }
  },
  Reading:{
    type:"array",
    "items":{
      type:String
    }
  },
  Confirmed:{
    type:Boolean,
    default: false
  },
  UserId:{
    type: String,
    unique: true
  }
  });

UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'), {expiresIn: '1d'});
  return token;
}
const User = mongoose.model('User', UserSchema);
function validateUser(User) {
const schema = {
UserName: Joi.string().min(3).max(50).required(),
UserEmail: Joi.string().min(6).max(255).required().email(),
UserPassword: Joi.string().min(6).max(255).required()
};
return Joi.validate(User, schema);
}
function validateNewPassword(User) {
const schema = {
token: Joi.string(),
OldUserPassword: Joi.string().min(6).max(255).required(),
NewUserPassword: Joi.string().min(6).max(255).required()
};
return Joi.validate(User, schema);
}

function validateDate(User) {
const schema = {
NewUserBirthDate: Joi.date(),
NewUserName: Joi.string().min(3).max(50).required(),
NewUserPhoto: Joi.string(),
token:Joi.string()
};
return Joi.validate(User, schema);
}
function validateMail(User) {
  const schema = {
  UserEmail: Joi.string().min(6).max(255).required().email()
  };
  return Joi.validate(User, schema);
  }
  function validateNewPasswordOnly(User) {
  const schema = {
  token: Joi.string(),
  NewUserPassword: Joi.string().min(6).max(255).required()

  };
  return Joi.validate(User, schema);
  }
exports.User = User;
exports.validate= validateUser;
exports.DateValidate= validateDate;
exports.NewPassWordValidate=  validateNewPassword;
exports.Mailvalidate= validateMail;
exports.NewPasswordOnlyValidate= validateNewPasswordOnly;
