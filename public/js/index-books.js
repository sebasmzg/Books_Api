var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BooksController } from "./controllers/books-controllers.js";
import { cardTemplate } from "./classes/card-template.js";
import { showConfirm, booksModification } from "./modals.js";
import { logOut } from "./logout.js";
const domain = 'http://190.147.64.47:5155/';
/* form elements */
const form = document.getElementById('form-books');
const title = document.getElementById('title-register');
const author = document.getElementById('author-register');
const description = document.getElementById('description-register');
const summary = document.getElementById('summary-register');
const publicationDate = document.getElementById('publication-date-register');
/* token */
const token = localStorage.getItem('token');
/* id cache */
let idCache;
/* logout */
const logout = document.getElementById('logout-btn');
/* card container */
const booksContainer = document.querySelector('.card-wrapper');
if (!token) {
    alert('No token found, please login first.');
    window.location.href = 'index.html';
}
else {
    const bookController = new BooksController(domain);
    function loadBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (token) {
                    const response = yield bookController.getBooks(token);
                    const books = response.data;
                    booksContainer.innerHTML = '';
                    books.forEach((bookData) => {
                        const card = new cardTemplate(booksContainer);
                        card.render(bookData);
                    });
                }
            }
            catch (error) {
                console.error('Error loading books', error);
            }
        });
    }
    /* load books */
    document.addEventListener('DOMContentLoaded', loadBooks);
    /* create books */
    form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const newBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };
        try {
            const crudBooks = new BooksController(domain);
            if (idCache === undefined) {
                yield crudBooks.createBook(newBook, token);
                yield booksModification('Your book has been successfully created');
            }
            else {
                yield crudBooks.updateBook(idCache, newBook, token);
                yield booksModification('Your book has been successfully modified');
                idCache = undefined;
            }
            form.reset();
            yield loadBooks();
        }
        catch (error) {
            console.error('Error creating/updating book:', error);
        }
    }));
    /* update and delete */
    booksContainer.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
        const target = e.target;
        if (target instanceof HTMLElement) {
            const action = target.dataset.action;
            const bookId = target.dataset.id;
            if (action === 'update' && bookId) {
                try {
                    const book = yield bookController.getBookById(token, bookId);
                    console.log('fetched book: ', book);
                    idCache = bookId;
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
                catch (error) {
                    console.error('Error fetching book:', error);
                }
            }
            else if (action === 'delete' && bookId) {
                const userConfirmed = yield showConfirm('Do you want to delete this book?');
                if (userConfirmed) {
                    try {
                        yield bookController.deleteBook(token, bookId);
                        yield loadBooks();
                    }
                    catch (error) {
                        console.error('Error deleting book:', error);
                    }
                }
            }
        }
    }));
    logout.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        yield logOut('logout-btn', 'index.html');
    }));
}
