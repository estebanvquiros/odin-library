const myLibrary = [];

function Book(title, author, numberOfPages, readStatus) {
	this.id = crypto.randomUUID();
	this.title = title;
	this.author = author;
	this.pages = numberOfPages;
	this.readStatus = readStatus;
}

function addBook(title, author, numberOfPages, readStatus) {
	const book = new Book(title, author, numberOfPages, readStatus);
	myLibrary.push(book);
}

// Simulation of books stored previously in memory
myLibrary.push(new Book("The Broken Sword", "Poul Anderson", 320, "read"));
myLibrary.push(new Book("The First Law", "Joe Abercrombie", 537, "unread"));

addBook("The Name of the Wind", "Patrick Rothfuss", 704, "read");
