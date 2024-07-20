var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class UsersController {
    constructor(domain) {
        this.domain = domain;
        this.token = null;
    }
    postLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Aqui creamos a los PARAMETROS:
            //El headers va a decir que es lo que va a
            //traer este fetch, y debe ser tipo Record ya que esto es como una especie
            //de diccionario. El Content Type, nos indica que tipo de data va a ser
            //enviada a la API. Usados para intercambiar metadata tambien, y contiene
            //al token
            const headers = {
                'accept': '*/*',
                'Content-Type': 'application/json',
            };
            //el RequestInit es un tipo de dato de la libreria de TS, y va a reconocer
            //nuestros parametros method, headers, body
            const reqOptions = {
                //El method va a decir que tipo de request va a hacer, en este caso POST
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const endpointLogin = 'api/v1/auth/login'; //endpoint login
            const url = this.domain + endpointLogin;
            const res = yield fetch(url, reqOptions);
            console.log('status code', res.status);
            if (res.status !== 201) {
                throw new Error(`Error: ${res.status}`);
            }
            const responseBodyLogin = yield res.json();
            this.token = responseBodyLogin.data.token;
            return responseBodyLogin;
        });
    }
    createUSer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json'
            };
            const reqOptions = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const endpointCreateUsers = 'api/v1/users';
            const url = this.domain + endpointCreateUsers;
            try {
                const res = yield fetch(url, reqOptions);
                console.log('Response status: ', res.status);
                const resBody = yield res.json();
                console.log('Response body: ', resBody);
                if (res.status !== 201) {
                    throw new Error(resBody.messagge || 'Failed to create new user');
                }
                ;
                return resBody;
            }
            catch (error) {
                console.error('Error creating user', error);
                throw error;
            }
        });
    }
}
