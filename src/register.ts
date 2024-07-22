import { UsersController } from "./controllers/users-controller.js";
import { IDataUser } from "./models/users-models.js";
import { domain } from "./login.js";


const form = <HTMLFormElement> document.getElementById("form-register");
const name = <HTMLInputElement> document.getElementById("name-register");
const lastName = <HTMLInputElement> document.getElementById("lastName-register");
const email = <HTMLInputElement> document.getElementById("email-register")
const password = <HTMLInputElement> document.getElementById("password-register");
const confirmPassword = <HTMLInputElement> document.getElementById("confirm-password-register");

form.addEventListener('submit', async (e: Event)=>{
    e.preventDefault();

    if(password.value === confirmPassword.value){
        const data: IDataUser = {
            name: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
        }
        const userController: UsersController = new UsersController(domain);
        try {
            const resultRegister = await userController.createUSer(data);
            form.reset();
        } catch (error) {
            console.error('Create user failed');   
        }
    } else {
        alert('Passwords don’t match')
    }

})