import { IBodyRequestLogin,IBodyResponseLogin, IDataUser, IBodyResponseUser } from "../models/users-models";

export class UsersController {
    domain: string;
    token: string | null;
    constructor(domain:string){
        this.domain = domain
        this.token = null
    }

    async postLogin(data: IBodyRequestLogin):Promise<IBodyResponseLogin>{
        //Aqui creamos a los PARAMETROS:

        //El headers va a decir que es lo que va a
        //traer este fetch, y debe ser tipo Record ya que esto es como una especie
        //de diccionario. El Content Type, nos indica que tipo de data va a ser
        //enviada a la API. Usados para intercambiar metadata tambien, y contiene
        //al token
        const headers :Record<string,string> = {
            'accept': '*/*',
            'Content-Type':'application/json',

        }
        //el RequestInit es un tipo de dato de la libreria de TS, y va a reconocer
        //nuestros parametros method, headers, body
        const reqOptions: RequestInit = {
            //El method va a decir que tipo de request va a hacer, en este caso POST
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
        
        const endpointLogin: string = 'api/v1/auth/login'; //endpoint login
        const url: string = this.domain + endpointLogin;
        const res: Response = await fetch(url, reqOptions);
        console.log('status code',res.status);
        if(res.status !== 201){
            throw new Error(`Error: ${res.status}`);
        }
        const responseBodyLogin: IBodyResponseLogin = await res.json();
        this.token = responseBodyLogin.data.token;
        return responseBodyLogin
    }

    async createUSer(data: IDataUser): Promise<IBodyResponseUser>{
        const headers: Record<string, string> = {
            'Content-Type': 'application/json'
        };
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
        const endpointCreateUsers: string = 'api/v1/users' 
        const url:string = this.domain+endpointCreateUsers;
        try {
            const res: Response = await fetch(url,reqOptions)
            console.log('Response status: ', res.status);
            
            const resBody = await res.json();
            console.log('Response body: ',resBody);
            
            if(res.status !== 201){
                throw new Error(resBody.messagge || 'Failed to create new user')
            };
            
            return resBody
        } catch (error){
            console.error('Error creating user',error);
            throw error;  
        }
    }
}