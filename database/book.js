const mongoose = require("mongoose");

//creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors:[Number],
    language:String,
    pub_date:String,
    num_of_pages:Number,
    category:[String],
    publications:Number,
});


//Create a book model
const BookModel = mongoose.model ("books", BookSchema);

module.exports= BookModel;