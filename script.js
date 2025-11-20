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

	const bookReadStatus = document.createElement("p");
	book.readStatus === "Read"
		?	bookReadStatus.classList.add("read-status", "read")
		: bookReadStatus.classList.add("read-status", "unread");
	bookReadStatus.textContent = book.readStatus;

	const bookTitle = document.createElement("h1");
	bookTitle.textContent = book.title;

	const bookAuthor = document.createElement("h2");
	bookAuthor.textContent = book.author;

	const bookNumberOfPages = document.createElement("p");
	bookNumberOfPages.textContent = `Pages: ${book.numberOfPages}`;

	bookCard.appendChild(bookReadStatus);
	bookCard.appendChild(bookTitle);
	bookCard.appendChild(bookAuthor);
	bookCard.appendChild(bookNumberOfPages);
	content.appendChild(bookCard);
}

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

