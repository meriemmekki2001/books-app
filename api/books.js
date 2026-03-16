import clientPromise from "./db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {

  const client = await clientPromise;
  const db = client.db("booksdb");
  const collection = db.collection("books");

  // GET all books
  if (req.method === "GET" && !req.query.id) {

    const books = await collection
      .find({})
      .sort({ title: 1 })
      .toArray();

    return res.status(200).json(books);
  }

  // GET one book
  if (req.method === "GET" && req.query.id) {

    const book = await collection.findOne({
      _id: new ObjectId(req.query.id)
    });

    return res.status(200).json(book);
  }

  // POST create book
  if (req.method === "POST") {

    const book = {
      title: req.body.title,
      authors: req.body.authors,
      publisher: req.body.publisher || "",
      publication_date: req.body.publication_date || "",
      average_rating: 0,
      ratings: []
    };

    await collection.insertOne(book);

    return res.status(200).json({ message: "Book created" });
  }

  // PUT update book
  if (req.method === "PUT") {

    const { id, title, authors } = req.body;

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          authors
        }
      }
    );

    return res.status(200).json({ message: "Book updated" });
  }

  // DELETE book
  if (req.method === "DELETE") {

    const { id } = req.body;

    await collection.deleteOne({
      _id: new ObjectId(id)
    });

    return res.status(200).json({ message: "Book deleted" });
  }

  // PATCH rate book
  if (req.method === "PATCH") {

    const { id, rating } = req.body;

    const book = await collection.findOne({
      _id: new ObjectId(id)
    });

    const ratings = book.ratings || [];

    ratings.push(Number(rating));

    const avg =
      ratings.reduce((a, b) => a + b, 0) / ratings.length;

    await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ratings,
          average_rating: avg
        }
      }
    );

    return res.status(200).json({ message: "Rating added" });
  }

  res.status(405).json({ message: "Method not allowed" });
}