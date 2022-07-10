let myLibrary = [];

function Book(title, author, pageNr, isRead) {
  this.title = title;
  this.author = author;
  this.pageNr = pageNr;
  this.isRead = isRead;

  // this.info = function() {
  //   return `${this.title} by ${this.author}, ${pageNr} pages, ${isRead ? 'is already read' : 'not read yet'}`;
  // }
}

function addBookToLibrary(title, author, pageNr, isRead) {
  let newBook = new Book(title, author, pageNr, isRead);
  myLibrary.push(newBook);

  // Add book to table
  let lastTr = document.querySelector('table tbody tr:last-child');
  if (!lastTr) {
    // if no tr added, select body instead
    lastTr = document.querySelector('table tbody');
  }

  const tr = document.createElement('tr');
  lastTr.after(tr);
  for (const key in newBook) {
    if (Object.prototype.hasOwnProperty.call(newBook, key)) {
      const td = document.createElement('td');
      td.innerText = newBook[key];
      tr.appendChild(td);
    }
  }
}

const addBookBtn = document.getElementById('add-book-btn');
const body = document.getElementById('body');
const formWrapper = document.querySelector('.form-wrapper');
const cancelBtn = document.querySelector('.input-wrapper:last-child button:last-of-type');
[addBookBtn, cancelBtn].forEach(e => e.addEventListener('click', () => {
  addBookBtn.classList.toggle('blurry-background');
  if (body.classList.contains('blurry-background')) {
    body.classList.remove('blurry-background');
    formWrapper.style.visibility = 'hidden';
  } else {
    body.classList.add('blurry-background');
    formWrapper.style.visibility = 'visible';
  }
}));

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;
  const bookPages = document.getElementById('bookPages').value;
  const bookIsRead = document.getElementById('bookIsRead').checked;
  addBookToLibrary(title, author, bookPages, bookIsRead);
  addBookForm.reset();
});