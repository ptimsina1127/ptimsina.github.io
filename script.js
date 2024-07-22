document.addEventListener('DOMContentLoaded', () => {
    const addBookForm = document.getElementById('add-book-form');
    const bookListUl = document.getElementById('book-list-ul');
    const searchInput = document.getElementById('search');

    let books = [];

    // Load books from local storage
    function loadBooks() {
        books = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('book-')) {
                const bookData = localStorage.getItem(key).split('|');
                const book = {
                    title: bookData[0],
                    author: bookData[1],
                    isbn: bookData[2]
                };
                books.push(book);
            }
        }
        renderBooks(books);
    }

    // Save a book to local storage
    function saveBook(book, index) {
        localStorage.setItem(`book-${index}`, `${book.title}|${book.author}|${book.isbn}`);
    }

    // Render books to the list
    function renderBooks(books) {
        bookListUl.innerHTML = '';
        books.forEach((book, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Title:</strong> ${book.title} <br>
                <strong>Author:</strong> ${book.author} <br>
                <strong>ISBN:</strong> ${book.isbn} <br>
                <button data-index="${index}" class="edit">Edit</button>
                <button data-index="${index}" class="delete">Delete</button>
            `;
            bookListUl.appendChild(li);
        });
    }

    // Event listener for form submission
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        const book = { title, author, isbn };
        books.push(book);
        saveBook(book, books.length - 1);

        renderBooks(books);
        addBookForm.reset();
    });

    // Event listener for list clicks
    bookListUl.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            books.splice(index, 1);
            localStorage.clear();
            books.forEach((book, i) => saveBook(book, i));
            renderBooks(books);
        } else if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const book = books[index];
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('isbn').value = book.isbn;
            books.splice(index, 1);
            localStorage.clear();
            books.forEach((book, i) => saveBook(book, i));
            renderBooks(books);
        }
    });

    // Event listener for search input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query)
        );
        renderBooks(filteredBooks);
    });

    loadBooks();
});