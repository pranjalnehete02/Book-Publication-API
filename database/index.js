const books = [
    {
        ISBN: "12345ONE",
        title:"Getting started with MERN",
        authors:[1,2],
        language:"en",
        pub_date:"2021-26-06",
        num_of_pages:300,
        category:["fiction", "programming", "tech", "web dev"],
        publications:1,
    },
    {
        ISBN: "12345Two",
        title:"Getting started with Python",
        authors:[1,2],
        language:"en",
        pub_date:"2021-26-06",
        num_of_pages:300,
        category:["fiction", "programming", "tech", "web dev"],
        publications:1,
    }
];





const authors = [
    {
        id:1,
        name:"pranjal",
        books:["12345ONE", "12345Two"],
    },
    {
        id:1,
        name:"yadu",
        books:["12345ONE"]   
    }
];






const publications = [
    {
        id:1,
        name:"Mauli",
        books:["12345ONE"],
    }];



    module.exports = {books, authors, publications};
// Here module means this file self (./database/index.js )
//and now we are exporting the file and importing to (./Books API's/ index.js)