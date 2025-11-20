const myLibrary = [];

const content = document.querySelector("#content");

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

// Simulation of books stored previously in memory
myLibrary.push(new Book("The Broken Sword", "Poul Anderson", 320, "Read"));
myLibrary.push(new Book("The First Law", "Joe Abercrombie", 537, "Unread"));

addBook("The Name of the Wind", "Patrick Rothfuss", 704, "Read");

getBooks();