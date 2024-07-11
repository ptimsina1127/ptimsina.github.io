document.addEventListener('DOMContentLoaded', () => {
    const addBookForm = document.getElementById('add-book-form');
    const bookListUl = document.getElementById('book-list-ul');
    const searchInput = document.getElementById('search');

    // Array to store book objects
    let books = [];

    // Function to add a book
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        const book = { title, author, isbn };
        books.push(book);

        renderBooks(books);
        addBookForm.reset();
    });

    // Function to render books
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

    // Function to handle book list actions
    bookListUl.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.getAttribute('data-index');
            books.splice(index, 1);
            renderBooks(books);
        } else if (e.target.classList.contains('edit')) {
            const index = e.target.getAttribute('data-index');
            const book = books[index];
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('isbn').value = book.isbn;
            books.splice(index, 1);
            renderBooks(books);
        }
    });

    // Function to search books
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query)
        );
        renderBooks(filteredBooks);
    });
});
