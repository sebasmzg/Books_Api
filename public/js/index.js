//---------------------------------- Consumo de API -------------------------
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UsersController } from "./controllers/users-controller.js";
//Dominio general de nuestra API
const domain = 'http://190.147.64.47:5155/';
//---------------------------------- Implementacion -----------------------------
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        //ingreso de usuario quemado
        const dataToLogin = {
            email: 'prueba@prueba.pru',
            password: 'C0ntr4S3gu++r4'
        };
        //creación usuario quemado
        const newUser = {
            name: 'J Sebastián',
            lastName: 'Muñoz',
            email: 'mzg1234@correo123.com',
            password: 's3bas@1234'
        };
        //Creamos un objeto con la clase BooksController, pasando el dominio de
        //nuestra API
        const booksController = new UsersController(domain);
        //Luego, en un TRY llamamos al metodo login, pasando el objeto con los datos de
        //login y esperamos que nos devuelva un mensaje determinado de que se ha logeado
        //correctamente. Si hay algún error, lo capturamos con CATCH y mostramos el error
        //en consola.
        try {
            const resultCreate = yield booksController.createUSer(newUser);
            const resultLogin = yield booksController.postLogin(dataToLogin);
            console.log(resultLogin);
            console.log(resultCreate);
        }
        catch (error) {
            console.log(`=( : ${error}`);
        }
    });
}
/* LOGIN */
/* async function postLogin(data: IBodyRequestLogin):Promise<IBodyResponseLogin>{
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
} */
/* postLogin(dataToLogin).then((result: IBodyResponseLogin):void =>{
    console.log(result);
}).catch((error): void =>{
    console.log(`=( : ${error}`);
}) */
/*--------------------- CREATE USERS------------------------------------ */
/*
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
}) */
