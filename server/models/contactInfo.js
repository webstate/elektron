var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactInfo = new Schema({
    title: String,
    info: String
});
module.exports = mongoose.model('info', contactInfo);
