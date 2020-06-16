const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const favouritesSchema = new Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  dishes :[{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Dishes'
  }] 
},
{
  timestamps: true
})

const Favourites = mongoose.model('Favourites',favouritesSchema);
module.exports = Favourites;