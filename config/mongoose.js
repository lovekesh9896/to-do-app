// require the library
const mongoose = require('mongoose');

// connect to  the database
mongoose.connect('mongodb://localhost/tags');

// aquire the connection to check if its working
const db = mongoose.connection;

db.on('error',function(err){
    console.log("error in aquiring the connection",err);
    return;
});

db.once('open',function(){
    console.log("Sucessfuly connected to database");
});
