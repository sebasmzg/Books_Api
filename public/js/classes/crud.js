var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Crud {
    constructor(url) {
        this.url = url;
    }
    create(name, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                name: name.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            };
            yield fetch(this.url, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }).catch(error => console.error('error', error));
        });
    }
    read(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.url}/${id}`);
            return yield res.json();
        });
    }
    update(id, name, lastName, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = {
                name: name.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            };
            yield fetch(this.url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            }).catch(error => console.error('error', error));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(`${this.url}/${id}`, {
                method: 'DELETE'
            }).catch(error => console.error('error', error));
        });
    }
}
