// we are creating a API
//FrameWork Express
const express = require("express");
//Database(importating The database file)
const database = require("./database/index");
//Initializing
const Mauli = express();
//configuration
Mauli.use(express.json());



/*
Route           Line no 18
Description     get all books
Access          Public
Parameters      None
Method          GET
*/

Mauli.get("/" , (req, res) => {
    return res.json({ books: database.books});
})





//getting ISBN number
/*
Route           Line no 31
Description     get specific book based on ISBN
Access          Public
Parameters      ISBN
Method          GET
*/
Mauli.get("/is/:ISBN", (req,res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.param.ISBN);
    //to check arewe getting the right ISBN number or not we USE LEGTH
    if (getSpecificBook.length === 0 ){
        return res.json({error:`No book found for the ISBN of ${req.param.ISBN}`,})
    }

    return res.json({book:getSpecificBook});
});




/*
Route           catgery
Description     get specific books on category
Access          Public
Parameters      category
Method          GET
*/
Mauli.get("/category/:category",(req,res) => {
    const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category));
    if (getSpecificBook.length === 0 ){
        return res.json({error:`No book found for the category of ${req.param.category}`,});
    }

    return res.json({books:getSpecificBook});
});
    




/*
Route           /authors
Description     get all authors
Access          Public
Parameters      NONE
Method          GET
*/
Mauli.get('/authors', (req, res) => {
    return res.json({ authors: database.authors});
});







/*
Route           /authors
Description     get all authors
Access          Public
Parameters      NONE
Method          GET
*/
Mauli.get('/authors', (req, res) => {
    return res.json({ authors: database.authors});
});




/*
Route           /author
Description     get list of all authors base on bokks's ISBN
Access          Public
Parameters      isbn 
Method          GET
*/
Mauli.get("/author/;isbn", (req,res) => {
    const getSpecificAuthors = database.authors((author) => author.books.includes(req.params.ISBN));
    if(getSpecificAuthors.length === 0 ){
        return res.json({error: `No authors found for the book ${req.params.ISBN}`,})
    }

    return res.json({ authors: getSpecificAuthors});
});





/*
Route           /publication
Description     get all the publications
Access          Public
Parameters      NONE 
Method          GET
*/
Mauli.get("/publications", (req,res) => {
    return res.json({publications: database.publications});
});












Mauli.listen(3000, () => console.log("Server is running😎😎"));





