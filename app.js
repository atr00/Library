const addBtn = document.querySelector("#add-btn");
const modal = document.querySelector(".modal");

let myLibrary = [];

function Book(title, author, pageCount) {
	this.title = title;
	this.author = author;
	this.pageCount = pageCount;
	this.read = false;
	this.info = function () {
		const readStatus = this.read ? "read" : "not read yet";
		return `${title} by ${author}, ${pageCount} pages, ${readStatus}.`;
	};
}

Book.prototype.toggleReadStatus = function () {
	this.read === true ? (this.read = false) : (this.read = true);
};

function addBookToLibrary() {
	const book = new Book("The Hobbit", "J.R.R. Tolkien", 295);
	myLibrary.push(book);
	console.table(myLibrary);
}

function showModal() {
	modal.style.display = "block";
}

// Show model window
addBtn.addEventListener("click", showModal);

// When the user clicks anywhere outside of the modal form, close it
window.onclick = function (event) {
	if (event.target === modal) {
		modal.style.display = "none";
	}
};

// For testn=ing
const book = new Book("The Hobbit", "J.R.R. Tolkien", 295);
myLibrary.push(book);
myLibrary.push(book);
myLibrary.push(book);
