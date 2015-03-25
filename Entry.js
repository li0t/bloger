var mongoose = require('mongoose');

var EntrySchema = mongoose.Schema({
    title : String,
    content : String,
    date : Date
}); 

module.exports = mongoose.model('Entry', EntrySchema);