const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const addBook = document.querySelector("#add-book");
const body = document.querySelector("body");
const container = document.querySelector(".card-container");
const check = document.querySelector("#read");
const newBook = document.querySelector(".new-book");
const modal = document.querySelector(".modal");

let bookLibrary = [];

function Book(title, author, pages, checkValue) {
  if (this instanceof Book === false) {
    return new Book(title, author, pages, checkValue);
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.checkValue = checkValue;
}
Book.prototype.readState = function () {
  return this.checkValue ? "Read" : "Unread";
};
Book.prototype.toggleRead = function () {
  return this.checkValue ? (this.checkValue = false) : (this.checkValue = true);
};
function pushToBookLibrary() {
  bookLibrary.push(
    new Book(bookTitle.value, bookAuthor.value, bookPages.value, check.checked)
  );
}
function createCard(book) {
  let card = document.createElement("div");
  let bookTitles = document.createElement("h2");
  let bookAuthors = document.createElement("p");
  let numberOfPages = document.createElement("p");
  const readStatus = document.createElement("button");
  const removeBook = document.createElement("button");

  container.appendChild(card);
  card.appendChild(bookTitles);
  card.appendChild(bookAuthors);
  card.appendChild(numberOfPages);
  card.appendChild(readStatus);
  card.appendChild(removeBook);

  bookTitles.textContent = book.title;
  bookAuthors.textContent = `By ${book.author}`;
  numberOfPages.textContent = `${book.pages} Pages`;
  readStatus.textContent = book.readState();
  removeBook.textContent = "Remove";
  card.classList.add("cards", "cards>p:first-of-type");

  removeBook.addEventListener("click", () => {
    bookLibrary.splice(bookLibrary.indexOf(book), 1);
    updateCardDisplay();
  });
  readStatus.addEventListener("click", () => {
    book.toggleRead();
    updateCardDisplay();
  });
}
function displayCards() {
  bookLibrary.forEach((book) => createCard(book));
}
function updateCardDisplay() {
  if (bookLibrary.length >= 0) {
    while (container.firstChild) container.removeChild(container.firstChild);
    displayCards();
  } else displayCards();
}
addBook.addEventListener("click", () => {
  pushToBookLibrary(), updateCardDisplay();
});
displayCards();
function toggleModal() {
  modal.classList.toggle("show-modal");
}
newBook.addEventListener("click", toggleModal);
window.onclick = function (event) {
  if (event.target == modal) {
    toggleModal();
  }
};