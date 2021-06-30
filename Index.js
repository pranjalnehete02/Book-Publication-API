// we are creating a API
//FrameWork Express
const express = require("express");
const mongoose = require("mongoose");
//Database(importating The database file)
const database = require("./database/index");
//Initializing
const Mauli = express();
//configuration
Mauli.use(express.json());
//Established the database(mangoDB)
mongoose.connect("mongodb+srv://Pranjal:database1@database1.p1slq.mongodb.net/Booky?retryWrites=true&w=majority" , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}
)
.then(() => console.log("connection is established!!!"));


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





/*
Route           /book/new
Description     Add new books
Access          Public
Parameters      NONE 
Method          POST
*/
Mauli.post("/book/new", (req, res) => {
    const { newBook } = req.body;

    database.books.push(newBook);


    return res.json({ books: database.books, message: "book was added!!" })
});




/*
Route           /author/new
Description     Add new books
Access          Public
Parameters      NONE 
Method          POST
*/
Mauli.post("/author/new", (req, res) => {
    const { neauthork } = req.body;

    database.authors.push(neauthork);


    return res.json({ books: database.authors, message: "author was added!!" })
});



/*
Route           /book/update
Description     update title of a book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Mauli.put("/book/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {book.title = req.body.bookTitle;return;}
    });
  
    return res.json({ books: database.books });
  });




  /*
Route           /book/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Mauli.put("/book/author/update/:isbn", (req, res) => {
    // update the book database
    database.books.forEach((book) => {if (book.ISBN === req.params.isbn)  return book.authors.push(req.body.newAuthor);
    });
  
    // update the author database
    database.authors.forEach((author) => {if (author.id === req.body.newAuthor)  return author.books.push(req.params.isbn);
    });
  
    return res.json({
      books: database.books,
      authors: database.authors,
      message: "New author was added 🚀",
    });
  });





  /*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
Mauli.put("/publication/update/book/:isbn", (req, res) => {
    // update the publication database
    database.publications.forEach((publication) => {if (publication.id === req.body.pubId) {return publication.books.push(req.params.isbn);}
    });
  
    // update the book database
    database.books.forEach((book) => {if (book.ISBN === req.params.isbn) {book.publication = req.body.pubId;
        return;}
    });
  
    return res.json({
      books: database.books,
      publications: database.publications,
      message: "Successfully updated publication",
    });
  });


  
/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
Mauli.delete("/book/delete/:isbn", (req, res) => {
    const updatedBookDatabase = database.books.filter((book) => book.ISBN !== req.params.isbn);
    database.books = updatedBookDatabase; return res.json({ books: database.books });
  });




/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
Mauli.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    // update the book database
    database.books.forEach((book) => {if (book.ISBN === req.params.isbn) {const newAuthorList = book.authors.filter((author) => author !== parseInt(req.params.authorId));
        book.authors = newAuthorList;
        return;}
    });
  
    // update the author database
    database.authors.forEach((author) => {
      if (author.id === parseInt(req.params.authorId)) {const newBooksList = author.books.filter((book) => book !== req.params.isbn);  
        author.books = newBooksList;
        return;}
    });
  
    return res.json({
      message: "Author was deleted😤😤😤",
      book: database.books,
      author: database.authors,
    });
  });




/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
Mauli.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
    // update publication database
    database.publications.forEach((publication) => {if (publication.id === parseInt(req.params.pubId)) {const newBooksList = publication.books.filter((book) => book !== req.params.isbn);
        publication.books = newBooksList;
        return;}
    });
  
    // update book database
    database.books.forEach((book) => {if (book.ISBN === req.params.isbn) {book.publication = 0; 
        // no publication available
        return;}
    });
  
    return res.json({
      books: database.books,
      publications: database.publications,
    });
  });


 

  
Mauli.listen(3000, () => console.log("Server is running😎😎"));





