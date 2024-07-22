import { BooksController } from "./controllers/books-controllers.js";
import { IBook, IBookData, IBooksResponse, IBooksLoadResponse } from "./models/books-models.js";
import { cardTemplate } from "./classes/card-template.js";
import { showConfirm, booksModification } from "./modals.js";
import { logOut } from "./logout.js";

const domain:string = 'http://190.147.64.47:5155/'; 

/* form elements */
const form = <HTMLFormElement> document.getElementById('form-books');
const title = <HTMLInputElement> document.getElementById('title-register');
const author = <HTMLInputElement> document.getElementById('author-register');
const description = <HTMLInputElement> document.getElementById('description-register');
const summary = <HTMLInputElement> document.getElementById('summary-register');
const publicationDate = <HTMLInputElement> document.getElementById('publication-date-register')
/* token */
const token: string | null= localStorage.getItem('token');
/* id cache */
let idCache: string | undefined;
/* logout */
const logout = <HTMLButtonElement> document.getElementById('logout-btn')
/* card container */
const booksContainer = <HTMLDivElement> document.querySelector('.card-wrapper')

if(!token){
    alert('No token found, please login first.');
    window.location.href='index.html'
} else{
    const bookController: BooksController = new BooksController(domain);
    
    async function loadBooks(){
        try{
            if(token){

                const response: IBooksLoadResponse = await bookController.getBooks(token);
                const books: IBookData[] = response.data

                booksContainer.innerHTML = '';
    
                books.forEach((bookData)=>{
                    const card = new cardTemplate(booksContainer)
                    card.render(bookData);
                });
            }

        } catch (error){
            console.error('Error loading books', error);
        }
    }

    /* load books */
    document.addEventListener('DOMContentLoaded',loadBooks)


    /* create books */
    form.addEventListener('submit',async (e:Event)=>{
        e.preventDefault();
        
        const newBook: IBook = {
            title: title.value,
            author: author.value,
            description: description.value,
            summary: summary.value,
            publicationDate: publicationDate.value
        };
        
        try {
            const crudBooks = new BooksController(domain);
            if(idCache === undefined){
                await crudBooks.createBook(newBook,token)
                await booksModification('Your book has been successfully created')
                
            } else {
                await crudBooks.updateBook(idCache,newBook, token)
                await booksModification('Your book has been successfully modified')
                idCache = undefined;
            }
            form.reset();
            await loadBooks();
        } catch (error){
            console.error('Error creating/updating book:', error);

        }
    });

    /* update and delete */

    booksContainer.addEventListener('click', async (e: Event)=>{
        const target = e.target as HTMLElement;

        if(target instanceof HTMLElement ){
            const action = target.dataset.action;
            const bookId = target.dataset.id;
            if(action === 'update' && bookId){

                
                try{
                    const book = await bookController.getBookById(token,bookId)
                    console.log('fetched book: ',book);
                    
                    idCache = bookId;
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate
                } catch(error){
                    console.error('Error fetching book:', error);
                }
            } else if(action === 'delete' && bookId){
                const userConfirmed = await showConfirm('Do you want to delete this book?')
                if(userConfirmed){
                    try {
                        await bookController.deleteBook(token,bookId);
                        await loadBooks();
                    } catch (error){
                        console.error('Error deleting book:', error);
                    }
                }
            }
        }
    });

    logout.addEventListener('click', async ()=>{
        await logOut('logout-btn','index.html')
    })
}

