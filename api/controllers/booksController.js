import BookRepository from "../repositories/BookRepository.js";
import Book from "../models/Book.js";

export async function getBooks(req,res){

  const books = await BookRepository.getAll();
  res.status(200).json(books);

}

export async function getBook(req,res){

  const book = await BookRepository.getById(req.query.id);
  res.status(200).json(book);

}

export async function createBook(req,res){

  const book = new Book(req.body);

  await BookRepository.create(book);

  res.status(200).json({message:"Book created"});

}

export async function updateBook(req,res){

  const {id,...data} = req.body;

  await BookRepository.update(id,data);

  res.status(200).json({message:"Book updated"});

}

export async function deleteBook(req,res){

  await BookRepository.delete(req.body.id);

  res.status(200).json({message:"Book deleted"});

}

export async function rateBook(req,res){

  const book = await BookRepository.getById(req.body.id);

  book.addRating(req.body.rating);

  await BookRepository.update(book.id,{
    ratings: book.ratings,
    average_rating: book.average_rating
  });

  res.status(200).json({message:"Rating added"});

}