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
import { domain } from "./login.js";
const form = document.getElementById("form-register");
const name = document.getElementById("name-register");
const lastName = document.getElementById("lastName-register");
const email = document.getElementById("email-register");
const password = document.getElementById("password-register");
const confirmPassword = document.getElementById("confirm-password-register");
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (password.value === confirmPassword.value) {
        const data = {
            name: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
        };
        const userController = new UsersController(domain);
        try {
            const resultRegister = yield userController.createUSer(data);
            console.log('User created', resultRegister.data);
            form.reset();
            alert('User created');
        }
        catch (error) {
            console.error('Create user failed');
        }
    }
    else {
        alert('Passwords don´t match');
    }
}));
