const mongoose = require('mongoose');
// makeing the list schema for storing the tasks
const listSchema = new mongoose.Schema({
    item:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        
    },
    tag:{
        type:String,
        
    },
    color:{
        type : String,
    },
    massage:{
        type:String,
    },
    trashed:{
        type:Boolean,
    },
});

const list = mongoose.model('list',listSchema);
// exporting the list
module.exports = list;

