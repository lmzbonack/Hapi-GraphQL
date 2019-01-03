const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const paintingSchema = new Schema({
    name: String,
    url: String,
    techniques: [ String ]
});

module.exports = Mongoose.model('Painting', paintingSchema);