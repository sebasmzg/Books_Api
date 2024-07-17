//---------------------------------- Consumo de API -------------------------

//Recordar el GIT FLOW y lo de Trello...

//Empezamos con el 'tsc --init'
//Luego, debemos de hacer 'npm init'

//Estamos usando el Modelo MVC: 
//                              Models
//                                      Views
//                                             Controllers     

//---------------------------------- Start ----------------------------------
import { IBodyRequestLogin, IBodyResponseLogin, IDataUser, IBodyResponseUser } from "./models/books-models.js";
import { Crud } from "./classes/crud";
import { BooksController } from "./controllers/books-controller.js";

const domain:string = 'http://190.147.64.47:5155/';
const endpointLogin:string = 'api/v1/auth/login';
const endpointCreateUsers: string = 'api/v1/users';
//Dominio general de nuestra API

//---------------------------------- Implementacion -----------------------------

/* async function main(): Promise<void> {

    //ingreso de usuario quemado
    const dataToLogin: IBodyRequestLogin={
        email: 'prueba@prueba.pru',
        password: 'C0ntr4S3gu++r4'
    }

    //Creamos un objeto con la clase BooksController, pasando el dominio de
    //nuestra API
    const booksController: BooksController = new BooksController(domain);

    //Luego, en un TRY llamamos al metodo login, pasando el objeto con los datos de
    //login y esperamos que nos devuelva un mensaje determinado de que se ha logeado
    //correctamente. Si hay algún error, lo capturamos con CATCH y mostramos el error
    //en consola.

    try {
        const resultLogin: IBodyResponseLogin= await booksController.postLogin(dataToLogin);
        console.log(resultLogin);
    } catch (error) {
        console.log(`=( : ${error}`);
    }
}

main() */

/* LOGIN */

const dataToLogin: IBodyRequestLogin={
    email: 'prueba@prueba.pru',
    password: 'C0ntr4S3gu++r4'
}

async function postLogin(data: IBodyRequestLogin):Promise<IBodyResponseLogin>{
    const headers: Record<string, string> = { //record<clave,valor>
        
        'Content-Type':'application/json'
        //'Authorization': 'Bearer <token>'
    };

    const reqOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }

    const url = domain + endpointLogin;
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

/* postLogin(dataToLogin).then((result: IBodyResponseLogin):void =>{
    console.log(result);
}).catch((error): void =>{
    console.log(`=( : ${error}`);
}) */


/*--------------------- CREATE USERS------------------------------------ */

async function createUser(data: IDataUser):Promise<IBodyResponseUser>{
    const headers: Record<string, string> = { //record<clave,valor>
        'Content-Type':'application/json',
        //'Authorization': 'Bearer <token>'
    };
    const reqOptions: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }
    const url = domain + endpointCreateUsers;
    
    try {
        
        const res: Response = await fetch(url, reqOptions) 
        console.log('Response status: ', res.status);

        const resBody = await res.json();
        console.log('Response body: ', resBody);
        
        if (res.status !== 201){
            throw new Error( resBody.message ||'Failed to create new user')
        }

        return resBody;
    } catch (error) {
        console.error('Error creating user', error);
        throw error;
        
    }

}

const loginUser: IBodyRequestLogin = {
    email: 'sebas@correo.com',
    password: 'sebas1234'
}

const newUser = {
    name: 'Sebastián',
    lastName: 'Muñoz',
    email: 'mg123@correo123.com',
    password: 'sebas@1234'
}

createUser(newUser).then((result: IBodyResponseUser):void=>
console.log('User created successfully',result)).catch((error): void =>{
    console.log(`=( : ${error.message}`);
})
/* postLogin(loginUser).then((result: IBodyResponseLogin):void =>{
    console.log(result);
}).catch((error): void =>{
    console.log(`=( : ${error}`);
}) */