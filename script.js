const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const addBook = document.querySelector("#add-book");
const body = document.querySelector("body");
const container = document.querySelector(".card-container");
const check = document.querySelector("#read");
const newBook = document.querySelector(".new-book");
const modal = document.querySelector(".modal");
const input = document.querySelectorAll(".input-field");

let bookLibrary = [];

class Book {
  constructor(title, author, pages, checkValue) {
    if (this instanceof Book === false) {
      return new Book(title, author, pages, checkValue);
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.checkValue = checkValue;
  }
  readState() {
    return this.checkValue ? "Read" : "Unread";
  }
  toggleRead() {
    return this.checkValue ? (this.checkValue = false) : (this.checkValue = true);
  }
}
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
  removeBook.textContent = "Delete";
  card.classList.add("cards", "cards>p:first-of-type", ".cards>button");

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
function checkForInvalidOrEmptyInput(){
  if (bookTitle.value == '') {
    addBook.disabled = true;
    bookAuthor.classList.add('input');
      setTimeout(function () {
        addBook.disabled = false;
      }, 1);
  }
  if (bookAuthor.value == ''){
    addBook.disabled = true;
    bookTitle.classList.add('input');
      setTimeout(function () {
        addBook.disabled = false;
      }, 1);
  }
  if (bookPages.value == '') {
    addBook.disabled = true;
    bookPages.classList.add('input');
      setTimeout(function () {
        addBook.disabled = false;
      }, 1);
  } else {
    pushToBookLibrary(), updateCardDisplay(), toggleModal();
    bookAuthor.value = '';
    bookTitle.value = '';
    bookPages.value = '';
    input.forEach(inputField => {
      inputField.classList.remove('input');
    })
  }
}
addBook.addEventListener("click", checkForInvalidOrEmptyInput);

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