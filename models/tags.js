const mongoose = require('mongoose');

const tagsSchema = new mongoose.Schema({
    tag:{
        type:String,
        required : true,
    },
    count:{
        type:Number,
        
    }
});


const tags = mongoose.model('tags',tagsSchema);

module.exports = tags;