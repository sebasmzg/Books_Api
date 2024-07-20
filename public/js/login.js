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
export const domain = 'http://190.147.64.47:5155/';
const form = document.getElementById('form-login');
const email = document.getElementById("email-login");
const password = document.getElementById("password-login");
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const dataToLogin = {
        email: email.value,
        password: password.value
    };
    const usersController = new UsersController(domain);
    try {
        const resultLogin = yield usersController.postLogin(dataToLogin);
        if (resultLogin.data.token) {
            localStorage.setItem('token', resultLogin.data.token);
            console.log('token: ', resultLogin.data.token);
            window.location.href = 'books.html';
            form.reset();
        }
    }
    catch (error) {
        console.error('Login failed ', error);
    }
}));
