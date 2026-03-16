let selectedBookId = null;

async function loadBooks() {

  const res = await fetch("/api/books");
  const books = await res.json();

  const select = document.getElementById("bookList");

  select.innerHTML = "";

  books.forEach(book => {

    const option = document.createElement("option");

    option.value = book._id;
    option.textContent = book.title;

    select.appendChild(option);

  });

}

async function loadBook() {

  const id = document.getElementById("bookList").value;
  selectedBookId = id;

  const res = await fetch(`/api/books?id=${id}`);
  const book = await res.json();

  document.getElementById("bookDetails").innerHTML = `
  <p><b>Title:</b> ${book.title}</p>
  <p><b>Authors:</b> ${book.authors}</p>
  <p><b>Publisher:</b> ${book.publisher}</p>
  <p><b>Publication:</b> ${book.publication_date}</p>
  <p><b>Average Rating:</b> ${book.average_rating}</p>
  `;
}

async function addBook() {

  const title = prompt("Title");
  const authors = prompt("Authors");

  await fetch("/api/books", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      title,
      authors
    })

  });

  loadBooks();
}

async function deleteBook() {

  await fetch("/api/books", {

    method: "DELETE",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      id: selectedBookId
    })

  });

  loadBooks();
}

async function rateBook() {

  const rating = prompt("Enter rating (0-5)");

  await fetch("/api/books", {

    method: "PATCH",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      id: selectedBookId,
      rating
    })

  });

  loadBook();
}

loadBooks();