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

  const stars = "⭐".repeat(Math.round(book.average_rating));

  document.getElementById("bookDetails").innerHTML = `
  <h2>${book.title}</h2>
  <p><b>Authors:</b> ${book.authors}</p>
  <p><b>Publisher:</b> ${book.publisher}</p>
  <p><b>Publication:</b> ${book.publication_date}</p>
  <p><b>Average Rating:</b> ${book.average_rating.toFixed(2)}</p>
  <p class="stars">${stars}</p>
  `;
}

function showAddForm() {
  document.getElementById("addModal").style.display = "flex";
}

function showRateForm() {
  document.getElementById("rateModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("addModal").style.display = "none";
  document.getElementById("rateModal").style.display = "none";
}

async function addBook() {

  const title = document.getElementById("newTitle").value;
  const authors = document.getElementById("newAuthors").value;
  const publisher = document.getElementById("newPublisher").value;
  const publication_date = document.getElementById("newDate").value;

  await fetch("/api/books", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      title,
      authors,
      publisher,
      publication_date
    })

  });

  closeModal();
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

  const rating = document.getElementById("ratingValue").value;

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

  closeModal();
  loadBook();
}

loadBooks();