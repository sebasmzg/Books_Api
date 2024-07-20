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
import { cardTemplate } from "./path/to/cardTemplate.js";
const domain = 'http://190.147.64.47:5155/';
const form = document.getElementById('form-books');
const title = document.getElementById('title-register');
const author = document.getElementById('author-register');
const description = document.getElementById('description-register');
const summary = document.getElementById('summary-register');
const booksContainer = document.querySelector('.card-wrapper');
const currentDate = new Date();
const publicationDate = currentDate.toISOString();
const token = localStorage.getItem('Token');
if (!token) {
    console.error('No token found, please login first.');
    // Redirect to login or show a message to the user
    // window.location.href = '/login.html'; // Example redirect to login
}
else {
    const bookController = new BooksController(domain);
    function loadBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield bookController.getBooks(token);
                const books = response.data; // Adapta según la interfaz
                // Render books
                books.forEach((bookData) => {
                    const book = {
                        title: bookData.title,
                        author: bookData.author,
                        description: bookData.description,
                        summary: bookData.summary,
                        publicationDate: bookData.publicationDate.toISOString() // Asegúrate de que el formato sea adecuado
                    };
                    const card = new cardTemplate(booksContainer);
                    card.render(book);
                });
            }
            catch (error) {
                console.error('Error loading books', error);
            }
        });
    }
    // Load books on page load
    document.addEventListener('DOMContentLoaded', loadBooks);
    form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const newBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate
        };
        try {
            const createdBookResponse = yield bookController.createBook(newBook, token);
            const createdBookData = createdBookResponse.data[0]; // Adaptar si la respuesta es un array o un objeto
            const createdBook = {
                title: createdBookData.title,
                author: createdBookData.author,
                description: createdBookData.description,
                summary: createdBookData.summary,
                publicationDate: createdBookData.publicationDate.toISOString() // Asegúrate de que el formato sea adecuado
            };
            // Render the new book card
            const card = new cardTemplate(booksContainer);
            card.render(createdBook);
            // Reset the form
            form.reset();
        }
        catch (error) {
            console.error('Error creating book', error);
        }
    }));
}
