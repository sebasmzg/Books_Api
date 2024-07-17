import { IBodyRequestLogin,IBodyResponseLogin } from "../models/books-models";

export class BooksController {
    domain: string;
    constructor(domain:string){
        this.domain = domain
    }

    async postLogin(data: IBodyRequestLogin):Promise<IBodyResponseLogin>{
        //Aqui creamos a los PARAMETROS:

        //El headers va a decir que es lo que va a
        //traer este fetch, y debe ser tipo Record ya que esto es como una especie
        //de diccionario. El Content Type, nos indica que tipo de data va a ser
        //enviada a la API. Usados para intercambiar metadata tambien, y contiene
        //al token
        const headers :Record<string,string> = {
            'Content-Type':'application/json'
        }
        //el RequestInit es un tipo de dato de la libreria de TS, y va a reconocer
        //nuestros parametros method, headers, body
        const reqOptions: RequestInit = {
            //El method va a decir que tipo de request va a hacer, en este caso POST
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }

        const endpointLogin: string = 'api/v1/auth/login';
        const url: string = this.domain + endpointLogin;
        const res: Response = await fetch(url, reqOptions);
        console.log('status code',res.status);
        if(res.status !== 201){
            console.log('Response body', (await res.json()).message);
            throw new Error('Not authenticaded: ');
        } else {
            console.log('Result',await res.json());
        }
        const responseBodyLogin: IBodyResponseLogin = await res.json();
        console.log('Result token:',responseBodyLogin.data.token);
        return responseBodyLogin
    }
}