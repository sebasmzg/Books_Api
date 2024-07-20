import { IBooksResponse, IBookData, IBook, IBooksLoadResponse } from "../models/books-models";


export class BooksController {
    domain: string;
    constructor(domain:string){
        this.domain = domain
    }
    async getBooks(token:string,limit?:number,page?:number): Promise<IBooksLoadResponse>{
        const headers: Record<string,string> = {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        }
        const reqOptions: RequestInit = {
            method: 'GET',
            headers: headers,
        }
        const endpointBooks: string = 'api/v1/books';
        const url:string = this.domain+endpointBooks;
        const res: Response = await fetch(url, reqOptions);
        console.log('Status code: ',res.status);
        if(res.status !== 200){
            throw new Error(`Error: ${res.status}`);
        }
        const responseGetBooks: IBooksLoadResponse = await res.json();
        return responseGetBooks
    }

    async getBookById(token:string,id:string):Promise<IBooksResponse>{
        const headers: Record<string,string> = {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
        }
        const reqOption: RequestInit ={
            method: 'GET',
            headers: headers
        }
        const endpointBooks: string = `api/v1/books/${id}`;
        const url:string = this.domain+endpointBooks;
        const res: Response = await fetch(url,reqOption)
        if(res.status !== 200){
            throw new Error(`Error: ${res.status}`);
        }
        const responseGetBooks: IBooksResponse = await res.json();
        return responseGetBooks;
    };

    async createBook(data: IBook,token:string):Promise<IBooksResponse> {
        const headers: Record<string,string> = {
            'accept': '*/*',
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        };
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        };
        const endpointBooks: string = 'api/v1/books';
        const url:string = this.domain+endpointBooks;
        const res: Response = await fetch(url, reqOptions);
        console.log('Status code: ',res.status);
        if(res.status !== 201){
            throw new Error(`Error: ${res.status}`);
        };
        const responseBook: IBooksResponse = await res.json();
        return responseBook
    };

    async updateBook(idCache:string,book:IBook,token:string){

       
        const headers: Record<string,string> = {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
            'Content-Type':'application/json'
        };
        const reqOption: RequestInit = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(book)
        };
        const endpointBooks: string = `api/v1/books/${idCache}`;
        const url:string = this.domain+endpointBooks 
        const res: Response = await fetch(url,reqOption);
        if(res.status !== 200){
            throw new Error(`Error: ${res.status}`);
        };
        const responseBook: IBooksResponse = await res.json();
        return responseBook
    }

    async deleteBook(token:string,id:string){
        const headers: Record<string,string> = {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`,
        };
        const reqOption: RequestInit = {
            method: 'DELETE',
            headers: headers
        };
        const endpointBooks: string = `api/v1/books/${id}`;
        const url:string = this.domain+endpointBooks;
        const res: Response = await fetch(url,reqOption);
        if(res.status !== 200){
            throw new Error(`Error: ${res.status}`);
        }
    }
}