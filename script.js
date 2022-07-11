let myLibrary = [];

function Book(title, author, pageNr, isRead) {
  this.title = title;
  this.author = author;
  this.pageNr = pageNr;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pageNr, isRead) {
  let newBook = new Book(title, author, pageNr, isRead);
  myLibrary.push(newBook);
}

function displayBooks() {
  document.getElementById('tbody').replaceChildren();
  for (let i = 0; i < myLibrary.length; i++) {
    addBookToDom(myLibrary[i], i);
  }
}

function addBookToDom(book, index) {
  const tr = document.createElement('tr');
  tr.dataset.index = index;
  let lastTr = document.querySelector('table tbody tr:last-child');
  if (!lastTr) {
    // if no table row added, select body instead
    lastTr = document.querySelector('table tbody');
    lastTr.appendChild(tr);
  } else {
    lastTr.after(tr);
  }

  for (const key in book) {
    if (Object.prototype.hasOwnProperty.call(book, key)) {
      const td = document.createElement('td');
      if (key === 'isRead') {
        const isReadBtn = document.createElement('button');
        isReadBtn.classList.add('btn', 'read-btn');
        isReadBtn.classList.add(book[key] === true ? 'book-read' : 'book-not-read');
        isReadBtn.addEventListener('click', function test() {
          console.log(book);
          book['isRead'] = !book['isRead'];
          this.classList.toggle('book-read');
          this.classList.toggle('book-not-read');
        });
        td.appendChild(isReadBtn);
      } else {
        td.innerText = book[key];
      }
      tr.appendChild(td);
    }
  }
  const td = document.createElement('td');

  // DELETE BUTTON
  const deleteBtn = document.createElement('button');
  deleteBtn.addEventListener('click', () => {
    myLibrary.splice(index, 1);
    displayBooks();
  });
  deleteBtn.classList.add('btn', 'delete-btn');
  deleteBtn.innerText = 'Delete'
  td.appendChild(deleteBtn);

  tr.appendChild(td);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    toggleForm();
  }
});

const addBookBtn = document.getElementById('add-book-btn');
const cancelBtn = document.querySelector('.input-wrapper:last-child button:last-of-type');
[addBookBtn, cancelBtn].forEach(btn => btn.addEventListener('click', toggleForm));

function toggleForm() {
  const addBookForm = document.getElementById('add-book-form');
  const addBookBtn = document.getElementById('add-book-btn');
  const formWrapper = document.querySelector('.form-wrapper');
  const body = document.getElementById('body');
  const header = document.getElementById('header');
  const table = document.getElementById('table');
  
  addBookBtn.classList.toggle('invisible');
  // addBookBtn.classList.toggle('blurry-background');
  if (body.classList.contains('blurry-background')) {
    table.style.visibility = 'visible';
    body.classList.remove('blurry-background');
    formWrapper.style.visibility = 'hidden';
    header.style.visibility = 'visible';
  } else {
    table.style.visibility = 'hidden';
    body.classList.add('blurry-background');
    formWrapper.style.visibility = 'visible';
    header.style.visibility = 'hidden';
  }
  addBookForm.reset();
  document.querySelector('.input-wrapper:first-of-type input').focus();
}

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;
  const bookPages = document.getElementById('bookPages').value;
  const bookIsRead = document.getElementById('bookIsRead').checked;
  addBookToLibrary(title, author, bookPages, bookIsRead);
  displayBooks();
  addBookForm.reset();
  toggleForm();
});
