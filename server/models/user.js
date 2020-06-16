const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

var userSchema = new Schema({
  firstname: {
    type: String,
      default: ''
  },
  lastname: {
    type: String,
      default: ''
  },
  facebookId:String,
  admin:   {
    type: Boolean,
    default: false
  }
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);

module.exports = User;