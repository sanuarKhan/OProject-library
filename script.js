// DOM Selectors (Improved for Efficiency)
const addBookBtn = document.getElementById("add-book-btn");
const booksContainer = document.getElementById("books-container");
const addBookForm = document.getElementById("add-book-form");
const bookForm = document.getElementById("book-form");
const closeFromBtn = document.getElementById("close-from-btn");

// Global Variables
let myLibrary = [];
//Save library to localStorage

function saveLibraryToStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// load library from localStrarage
function loadLibraryFromLocalStorage() {
  const storedLibrary = localStorage.getItem("myLibrary");
  if (storedLibrary) {
    myLibrary = JSON.parse(storedLibrary).map(
      (bookData) =>
        new Book(
          bookData.img,
          bookData.title,
          bookData.author,
          bookData.pages,
          bookData.status
        )
    );
  }
}
// Book Class and Methods
class Book {
  constructor(img, title, author, pages, read) {
    this.img = img;
    this.title = capitalizeWord(title); // Capitalize the book title
    // this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    // Define the possible statuses
    const statuses = ["read", "notRead"];
    const currentIndex = statuses.indexOf(this.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    this.status = statuses[nextIndex];
    console.log(this.status);
  }

  // Create a book card element dynamically
  createBookCard() {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const img = document.createElement("img");

    console.log(this.img, "from book card");
    img.src = this.img;
    bookCard.appendChild(img);

    const titleEl = document.createElement("h3");
    titleEl.textContent = this.title;
    bookCard.appendChild(titleEl);

    const authorEl = document.createElement("p");
    authorEl.textContent = `By ${this.author}`;
    bookCard.appendChild(authorEl);

    const pagesEl = document.createElement("p");
    pagesEl.textContent = `${this.pages} pages`;
    bookCard.appendChild(pagesEl);

    const readStatusEl = document.createElement("p");
    readStatusEl.classList.add("read-status");
    readStatusEl.textContent = this.read ? "Read" : "Not Read";
    bookCard.appendChild(readStatusEl);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", () => {
      this.removeBookFromLibrary(removeBtn.parentElement.parentElement);
    });
    buttonContainer.appendChild(removeBtn);

    // const readBtn = document.createElement("button");
    // readBtn.textContent = this.read ? "Mark Unread" : "Mark Read";
    // readBtn.addEventListener("click", () => {
    //   this.toggleReadStatus();
    //   readBtn.textContent = this.read ? "Mark Unread" : "Mark Read";

    //   readStatusEl.textContent = this.read ? "Read" : "Not Read";
    // });
    // buttonContainer.appendChild(readBtn);

    bookCard.appendChild(buttonContainer);

    return bookCard;
  }

  removeBookFromLibrary(bookCard) {
    const index = myLibrary.indexOf(this);
    if (index !== -1) {
      myLibrary.splice(index, 1);
      booksContainer.removeChild(bookCard);
      saveLibraryToStorage();
    }
  }
}

// Functions
function addBookToLibrary(book) {
  myLibrary.push(book);
  saveLibraryToStorage();
  const bookCard = book.createBookCard();
  booksContainer.appendChild(bookCard);
}

function getBookDetails() {
  const img = document.getElementById("img").value.trim();
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value.trim();
  const read = document.getElementById("read").checked;

  return new Book(img, title, author, pages, read);
}

function displayBooks() {
  booksContainer.innerHTML = ""; // Clear existing books
  myLibrary.forEach((book) => {
    const bookCard = book.createBookCard();
    booksContainer.appendChild(bookCard);
  });
}

function toggleAddBookForm() {
  addBookForm.classList.toggle("show");
}

// Event Listeners
addBookBtn.addEventListener("click", toggleAddBookForm);
closeFromBtn.addEventListener("click", toggleAddBookForm);

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newBook = getBookDetails();
  addBookToLibrary(newBook);
  toggleAddBookForm();
});

// Load Library from Local Storage on Page Load
loadLibraryFromLocalStorage();
displayBooks();
function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
