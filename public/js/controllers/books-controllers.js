var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BooksController {
    constructor(domain) {
        this.domain = domain;
    }
    getBooks(token, limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'GET',
                headers: headers,
            };
            const endpointBooks = 'api/v1/books';
            const url = this.domain + endpointBooks;
            const res = yield fetch(url, reqOptions);
            console.log('Status code: ', res.status);
            if (res.status !== 200) {
                throw new Error(`Error: ${res.status}`);
            }
            const responseGetBooks = yield res.json();
            return responseGetBooks;
        });
    }
    getBookById(token, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`
            };
            const reqOption = {
                method: 'GET',
                headers: headers
            };
            const endpointBooks = `api/v1/books/${id}`;
            const url = this.domain + endpointBooks;
            const res = yield fetch(url, reqOption);
            if (res.status !== 200) {
                throw new Error(`Error: ${res.status}`);
            }
            const responseGetBooks = yield res.json();
            return responseGetBooks;
        });
    }
    ;
    createBook(data, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const endpointBooks = 'api/v1/books';
            const url = this.domain + endpointBooks;
            const res = yield fetch(url, reqOptions);
            console.log('Status code: ', res.status);
            if (res.status !== 201) {
                throw new Error(`Error: ${res.status}`);
            }
            ;
            const responseBook = yield res.json();
            return responseBook;
        });
    }
    ;
    updateBook(idCache, book, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            const reqOption = {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(book)
            };
            const endpointBooks = `api/v1/books/${idCache}`;
            const url = this.domain + endpointBooks;
            const res = yield fetch(url, reqOption);
            if (res.status !== 200) {
                throw new Error(`Error: ${res.status}`);
            }
            ;
            const responseBook = yield res.json();
            return responseBook;
        });
    }
    deleteBook(token, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
            };
            const reqOption = {
                method: 'DELETE',
                headers: headers
            };
            const endpointBooks = `api/v1/books/${id}`;
            const url = this.domain + endpointBooks;
            const res = yield fetch(url, reqOption);
            if (res.status !== 200) {
                throw new Error(`Error: ${res.status}`);
            }
        });
    }
}
