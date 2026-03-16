import {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
    rateBook
  } from "./controllers/booksController.js";
  
  export default async function handler(req,res){
  
    if(req.method==="GET" && !req.query.id)
      return getBooks(req,res);
  
    if(req.method==="GET" && req.query.id)
      return getBook(req,res);
  
    if(req.method==="POST")
      return createBook(req,res);
  
    if(req.method==="PUT")
      return updateBook(req,res);
  
    if(req.method==="DELETE")
      return deleteBook(req,res);
  
    if(req.method==="PATCH")
      return rateBook(req,res);
  
    res.status(405).json({message:"Method not allowed"});
  }