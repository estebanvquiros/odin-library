const myLibrary = [];

const content = document.querySelector("#content");

const addBookBtn = document.querySelector("#addBookBtn");
const addBookForm = document.querySelector("#addBookForm");
const addBookFormTitle = document.querySelector("#bookTitle");
const addBookFormAuthor = document.querySelector("#bookAuthor");
const addBookFormNumberOfPages = document.querySelector("#bookNumberOfPages");
const addBookFormReadStatus = document.querySelector("#bookReadStatus");
const addBookModal = document.querySelector("#addBookModal");
const closeModalBtn = document.querySelector("#closeModalBtn");

function Book(title, author, numberOfPages, readStatus) {
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.numberOfPages = numberOfPages;
	this.readStatus = readStatus;
}

Book.prototype.changeReadStatus = function() {
    this.readStatus === 'Read'
    ? this.readStatus = 'Unread'
    : this.readStatus = "Read";
}

function addBook(title, author, numberOfPages, readStatus) {
	const book = new Book(title, author, numberOfPages, readStatus);
	myLibrary.push(book);
    displayBook(book);
}

function getBooks() {
	for (const book of myLibrary) {
		displayBook(book);
	}
}

function displayBook(book) {
	const bookCard = document.createElement("div")
	bookCard.classList.add("book-card");
    bookCard.setAttribute("data-book-id", book.id);

	const bookReadStatus = document.createElement("p");
	book.readStatus === "Read"
		? bookReadStatus.classList.add("read-status", "read")
		: bookReadStatus.classList.add("read-status", "unread");
	bookReadStatus.textContent = book.readStatus;

	const bookTitle = document.createElement("h1");
	bookTitle.textContent = book.title;

	const bookAuthor = document.createElement("h2");
	bookAuthor.textContent = book.author;

	const bookNumberOfPages = document.createElement("p");
	bookNumberOfPages.textContent = `Pages: ${book.numberOfPages}`;

    const removeBookBtn = document.createElement("button");
    removeBookBtn.textContent = "Remove";
    removeBookBtn.classList.add("btn", "default-button", "remove-book-btn");

    const changeBookReadStatusBtn = document.createElement("button");
    changeBookReadStatusBtn.classList.add("btn", "primary-btn", "change-book-read-status-btn");
    book.readStatus === "Read"
    ? changeBookReadStatusBtn.textContent = "Mark as Unread"
    : changeBookReadStatusBtn.textContent = "Mark as Read";

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookNumberOfPages);

    const bookControls = document.createElement("div");
    bookControls.classList.add("book-controls");
    bookControls.appendChild(removeBookBtn);
    bookControls.appendChild(changeBookReadStatusBtn);

	bookCard.appendChild(bookReadStatus);
    bookCard.appendChild(bookInfo);
    bookCard.appendChild(bookControls);
	content.appendChild(bookCard);
}

function removeBookFromLibrary(bookId) {
    const bookPosition = myLibrary.findIndex((book) => book.id === bookId);
    myLibrary.splice(bookPosition, 1);
}

function changeBookReadStatus(bookId) {
    const bookPosition = myLibrary.findIndex((book) => book.id === bookId);
    myLibrary[bookPosition].changeReadStatus();
    return myLibrary[bookPosition].readStatus;
}

function updateDisplayBookReadStatus(readStatus, event) {
    const bookReadStatusLabel = event.target.closest(".book-card").querySelector(".read-status");
    const changeBookReadStatusBtn = event.target.closest(".book-card").querySelector(".change-book-read-status-btn");
    if (readStatus === "Read") {
        bookReadStatusLabel.textContent = "Read";
        bookReadStatusLabel.classList.remove("unread");
        bookReadStatusLabel.classList.add("read");
        changeBookReadStatusBtn.textContent = "Mark as Unread";
    } else {
        bookReadStatusLabel.textContent = "Unread";
        bookReadStatusLabel.classList.remove("read");
        bookReadStatusLabel.classList.add("unread");
        changeBookReadStatusBtn.textContent = "Mark as Read";
    }
}

content.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-book-btn")) {
        removeBookFromLibrary(e.target.closest(".book-card").dataset.bookId);
        e.target.closest(".book-card").remove();
    }
    if (e.target.classList.contains("change-book-read-status-btn")) {
        const readStatus = changeBookReadStatus(e.target.closest(".book-card").dataset.bookId);
        updateDisplayBookReadStatus(readStatus, e);
    }
})

addBookBtn.addEventListener("click", () => {
	addBookModal.showModal();
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault(); //Avoid page reload on form submit
    addBook(
        addBookFormTitle.value,
        addBookFormAuthor.value,
        addBookFormNumberOfPages.value,
        addBookFormReadStatus.value,
    );
    addBookModal.close();
    addBookForm.reset();
});

closeModalBtn.addEventListener("click", () => {
	addBookModal.close();
    addBookForm.reset();
});

// Simulation of books stored previously in memory
myLibrary.push(new Book("The Broken Sword", "Poul Anderson", 320, "Read"));
myLibrary.push(new Book("The First Law", "Joe Abercrombie", 537, "Unread"));
getBooks();

addBook("The Name of the Wind", "Patrick Rothfuss", 704, "Read");
addBook("Mistborn: The Final Empire", "Brandon Sanderson", 541, "Read");
addBook("Dune", "Frank Herbert", 688, "Read");
addBook("The Way of Kings", "Brandon Sanderson", 1007, "Unread");
addBook("Good Omens", "Neil Gaiman & Terry Pratchett", 432, "Unread");
addBook("The Hobbit", "J.R.R. Tolkien", 310, "Read");
addBook("1984", "George Orwell", 328, "Unread");
addBook("Foundation", "Isaac Asimov", 255, "Unread");
addBook("The Lies of Locke Lamora", "Scott Lynch", 722, "Read");
addBook("The Blade Itself", "Joe Abercrombie", 560, "Read");
addBook("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 309, "Read");

