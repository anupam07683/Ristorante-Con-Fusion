const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
      type: String,
      required: true
    },
    abbr: {
      type: String,
      default: ''
    },
    designation: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default:false      
    } 
});

var Leader = mongoose.model('Leader',leaderSchema);

module.exports = Leader;