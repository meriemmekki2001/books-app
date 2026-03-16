export default class Book {

    constructor({
      id = null,
      title,
      authors,
      publisher = "",
      publication_date = "",
      average_rating = 0,
      ratings = []
    }) {
  
      this.id = id;
      this.title = title;
      this.authors = authors;
      this.publisher = publisher;
      this.publication_date = publication_date;
      this.average_rating = average_rating;
      this.ratings = ratings;
  
    }
  
    addRating(rating) {
  
      this.ratings.push(Number(rating));
  
      const sum = this.ratings.reduce((a,b)=>a+b,0);
  
      this.average_rating = sum / this.ratings.length;
  
    }
  
  }