var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    name: String,
    priceMethod: String,
    price: String,
    currency: String,
    information: String,
    picture: [String],
    quantity: {type: Number, default: 0},
    mainImage: {type: String, default:""},
    keyword: String
});
module.exports = mongoose.model('products', Product);
