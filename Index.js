require("dotenv").config();

// Frame work
const express = require("express");
const mongoose = require("mongoose");

// Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

// Initializing express
const Mauli = express();

// Configurations
Mauli.use(express.json());

// Establish Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connection established 😤😤😤"));

// Initializing Microservices
Mauli.use("/book", Books);
Mauli.use("/author", Authors);
Mauli.use("/publication", Publications);

 

  
Mauli.listen(3000, () => console.log("Server is running😎😎"));


   


