const addBtn = document.querySelector("#add-btn");
const modal = document.querySelector(".modal");
const gridLibrary = document.querySelector("#library-grid");
const submitNewBookBtn = document.querySelector("#submit-book-btn");
const cancelNewBookBtn = document.querySelector("#cancel-book-btn");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pageCount = document.querySelector("#page-count");
const readStatusChoices = document.querySelectorAll(
  "input[name='read-status']"
);

let myLibrary = [];

function Book(title, author, pageCount, readStatus) {
  this.id = Date.now() + Math.random() * 100;
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = readStatus;
  this.info = function () {
    const readStatus = this.read ? "read" : "not read yet";
    return `${title} by ${author}, ${pageCount} pages, ${readStatus}.`;
  };
}

Book.prototype.toggleReadStatus = function () {
  this.read === true ? (this.read = false) : (this.read = true);
};

function addBookToLibrary() {
  const book = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
  myLibrary.push(book);
  console.table(myLibrary);
}

// Show modal window
function showModal() {
  modal.style.display = "flex";
}
addBtn.addEventListener("click", showModal);

// When the user clicks anywhere outside of the modal form, close it
window.onclick = function (event) {
  if (event.target === modal) {
		resetForm();
		modal.style.display = "none";
  }
};

// Create the event listened to toggle book read status
function toggleReadStatus(event) {
  const idx = event.target.dataset["idx"];
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

// For testing
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
    const bookIdx = myLibrary.findIndex((object) => {
      return object.id === book.id;
    });

    newDiv.classList.add("book-card");

    const titleHeading = document.createElement("h2");
    titleHeading.textContent = book.title;

    const authorHeading = document.createElement("h3");
    authorHeading.textContent = book.author;

    const pageCountParagraph = document.createElement("p");
    pageCountParagraph.textContent = `${book.pageCount} pages`;

    const readButton = document.createElement("button");
    readButton.setAttribute("data-idx", bookIdx.toString());
    readButton.addEventListener("click", toggleReadStatus);
    readButton.classList.add("btn");
    readButton.setAttribute("data-idx", bookIdx.toString());

    const delButton = document.createElement("button");
    const iconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const iconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    iconSvg.setAttribute("fill", "#3e4a61");
    iconSvg.setAttribute("viewBox", "0 0 24 24");
    iconPath.setAttribute(
      "d",
      "M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
    );
    iconSvg.appendChild(iconPath);
    delButton.appendChild(iconSvg);
    delButton.classList.add("del-btn");
    delButton.setAttribute("data-idx", bookIdx.toString());
    delButton.addEventListener("click", deleteBook);

    // Check book read status
    if (book.read === true) {
      readButton.textContent = "READ";
      readButton.style.color = "var(--green-color)";
    } else {
      readButton.textContent = "NOT READ";
      readButton.style.color = "var(--rust-color)";
    }

    newDiv.appendChild(titleHeading);
    newDiv.appendChild(document.createElement("hr"));
    newDiv.appendChild(authorHeading);
    newDiv.appendChild(document.createElement("hr"));
    newDiv.appendChild(pageCountParagraph);
    newDiv.appendChild(document.createElement("hr"));
    newDiv.appendChild(readButton);
    newDiv.appendChild(document.createElement("hr"));
    newDiv.appendChild(delButton);

    gridLibrary.appendChild(newDiv);
  }
}

function getReadStatusChoice(radionButtons) {
  let selectedValue;

  for (const radioButton of [...radionButtons]) {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
      break;
    }
  }
  return selectedValue;
}

function validateForm() {
  const authorValue = author.value;
  const titleValue = title.value;
  const pageCountValue = pageCount.value;
  const readStatusValue = getReadStatusChoice(readStatusChoices);

  if (authorValue === "") {
    author.setCustomValidity("Please enter an author name.");
    author.reportValidity();
    return false;
  }

  if (titleValue === "") {
    title.setCustomValidity("Please enter a title.");
    title.reportValidity();
    return false;
  }

  if (pageCountValue === "" || !parseInt(pageCountValue)) {
    pageCount.setCustomValidity("Please enter a correct page count.");
    pageCount.reportValidity();
    return false;
  }

  if (!readStatusValue) {
    [...readStatusChoices][1].setCustomValidity(
      "Please check one of the options."
    );
    [...readStatusChoices][1].reportValidity();
    return false;
  }

  author.setCustomValidity("");
  title.setCustomValidity("");
  pageCount.setCustomValidity("");
  [...readStatusChoices][1].setCustomValidity("");

  return true;
}

function submitNewBook(event) {
  event.preventDefault();
  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  const authorValue = author.value;
  const titleValue = title.value;
  const pageCountValue = pageCount.value;
  const readStatusValue = Boolean(getReadStatusChoice(readStatusChoices));
  const newBook = new Book(
    authorValue,
    titleValue,
    pageCountValue,
    readStatusValue
  );
  myLibrary.push(newBook);
  updateLibrary();
  resetForm();

  modal.style.display = "none";
}
submitNewBookBtn.addEventListener("click", submitNewBook);

function resetForm() {
	author.value = "";
	title.value = "";
	pageCount.value = "";
	for (const radioBtn of [...readStatusChoices]) {
		radioBtn.checked = false;
	}
}

function deleteBook(event) {
  event.preventDefault();
  const idx = event.target.dataset["idx"];
  myLibrary.splice(idx, 1);
  updateLibrary();
}

function hideModal(event) {
  event.preventDefault();
  resetForm();
  modal.style.display = "none";
}
cancelNewBookBtn.addEventListener("click", hideModal);

updateLibrary();
