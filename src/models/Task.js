const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: String,
    description: String
});
module.exports = mongoose.model('Task', TaskSchema); //module.exports exporta para poder usarlo en otra parte