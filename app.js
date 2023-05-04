const addBtn = document.querySelector("#add-btn");
const modal = document.querySelector(".modal");
const gridLibrary = document.querySelector("#library-grid");

const newBookAuthor = document.querySelector("#author");
const newBookTitle = document.querySelector("#title");
const newBookPageCount = document.querySelector("#page-count");
const newBookReadStatus = document.querySelector("#read-status");
const submitNewBookBtn = document.querySelector("#submit-book-btn")
const cancelNewBookBtn = document.querySelector("#cancel-book-btn")

let myLibrary = [];

function Book(title, author, pageCount) {
  this.id = Date.now() + Math.random() * 100;
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

// Show modal window
function showModal() {
  modal.style.display = "flex";
}
addBtn.addEventListener("click", showModal);

function hideModal(event) {
	event.preventDefault();
	modal.style.display = "none";
}
cancelNewBookBtn.addEventListener("click", hideModal);

// When the user clicks anywhere outside of the modal form, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


// Create the event listened to toggle book read status
function toggleReadStatus(event) {
	const idx = event.target.dataset["idx"];
	console.log(event.target.dataset);
	const book = myLibrary[idx];
	book.toggleReadStatus();
	if (book.read === true) {
		event.target.textContent = "READ";
		event.target.style.color = "var(--green-color)";
	} else {
		event.target.textContent = "NOT READ";
		event.target.style.color = "var(--rust-color)";
	}
}


// For testn=ing
let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295);
myLibrary.push(book1);
let book2 = new Book("The Hobbit", "J.R.R. Tolkien", 290);
myLibrary.push(book2);
let book3 = new Book("The Hobbit", "J.R.R. Tolkien", 298);
myLibrary.push(book3);


function updateLibrary() {
  gridLibrary.innerHTML = "";

  for (const book of myLibrary) {
    const newDiv = document.createElement("div");
		const bookIdx = myLibrary.findIndex(object => {
			return object.id === book.id;
		});
		console.log(bookIdx);

    newDiv.classList.add("book-card");

    const titleHeading = document.createElement("h2");
    titleHeading.textContent = book.title;

    const authorHeading = document.createElement("h3");
    authorHeading.textContent = book.author;

    const pageCountParagraph = document.createElement("p");
    pageCountParagraph.textContent = `${book.pageCount} pages`;

    const button = document.createElement("button");
		button.setAttribute("data-idx", bookIdx.toString());
		button.addEventListener("click", toggleReadStatus);
		button.classList.add("btn");

		// Check book read status
		if (book.read === true) {
			button.textContent = "READ";
			button.style.color = "var(--green-color)";
		} else {
			button.textContent = "NOT READ";
			button.style.color = "var(--rust-color)";
		}

    newDiv.appendChild(titleHeading);
    newDiv.appendChild(document.createElement("hr"));
    newDiv.appendChild(authorHeading);
    newDiv.appendChild(document.createElement("hr"));
    newDiv.appendChild(pageCountParagraph);
    newDiv.appendChild(document.createElement("hr"));
    newDiv.appendChild(button);

    gridLibrary.appendChild(newDiv);
  }
}



updateLibrary();
