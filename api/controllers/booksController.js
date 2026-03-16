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



export async function rateBook(req, res) {

    try {
  
      const { id, rating } = req.body;
  
      if (rating === undefined || id === undefined) {
        return res.status(400).json({ message: "Missing id or rating" });
      }
  
      const book = await BookRepository.getById(id);
  
     
      book.ratings = book.ratings || [];
  
    
      book.ratings.push(Number(rating));
      book.average_rating =
        book.ratings.reduce((a, b) => a + b, 0) / book.ratings.length;
  
  
      await BookRepository.update(book._id, {
        ratings: book.ratings,
        average_rating: book.average_rating
      });
  
      res.status(200).json({ message: "Rating added" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  
  }