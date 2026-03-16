import clientPromise from "../db";
import { ObjectId } from "mongodb";
import Book from "../models/Book.js";

export default class BookRepository {

  static async getAll() {

    const client = await clientPromise;
    const db = client.db("booksdb");

    const books = await db.collection("books")
      .find({})
      .sort({ title: 1 })
      .toArray();

    return books.map(b => new Book({ ...b, id: b._id }));

  }

  static async getById(id) {

    const client = await clientPromise;
    const db = client.db("booksdb");

    const book = await db.collection("books")
      .findOne({ _id: new ObjectId(id) });

    return new Book({ ...book, id: book._id });

  }

  static async create(book) {

    const client = await clientPromise;
    const db = client.db("booksdb");

    return db.collection("books").insertOne(book);

  }

  static async update(id, data) {

    const client = await clientPromise;
    const db = client.db("booksdb");

    return db.collection("books").updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

  }

  static async delete(id) {

    const client = await clientPromise;
    const db = client.db("booksdb");

    return db.collection("books")
      .deleteOne({ _id: new ObjectId(id) });

  }

}