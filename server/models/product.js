var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    name: String,
    priceMethod: String,
    price: String,
    currency: String,
    information: String,
    picture: [String],
    quantity: {type: String, default: ""},
    mainImage: {type: String, default:""},
    keyword: String,
    minOrderQuantity: {type: String, default: ""}
});
module.exports = mongoose.model('products', Product);
