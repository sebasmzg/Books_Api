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
    postLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Aqui creamos a los PARAMETROS:
            //El headers va a decir que es lo que va a
            //traer este fetch, y debe ser tipo Record ya que esto es como una especie
            //de diccionario. El Content Type, nos indica que tipo de data va a ser
            //enviada a la API. Usados para intercambiar metadata tambien, y contiene
            //al token
            const headers = {
                'Content-Type': 'application/json'
            };
            //el RequestInit es un tipo de dato de la libreria de TS, y va a reconocer
            //nuestros parametros method, headers, body
            const reqOptions = {
                //El method va a decir que tipo de request va a hacer, en este caso POST
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            const endpointLogin = 'api/v1/auth/login';
            const url = this.domain + endpointLogin;
            const res = yield fetch(url, reqOptions);
            console.log('status code', res.status);
            if (res.status !== 201) {
                console.log('Response body', (yield res.json()).message);
                throw new Error('Not authenticaded: ');
            }
            else {
                console.log('Result', yield res.json());
            }
            const responseBodyLogin = yield res.json();
            console.log('Result token:', responseBodyLogin.data.token);
            return responseBodyLogin;
        });
    }
}
