export class Crud {
    url: string;

    constructor(url: string){
        this.url = url;
    }

    async create(name:HTMLInputElement,lastName:HTMLInputElement,email:HTMLInputElement,password:HTMLInputElement): Promise<void>{
        const newUser = {
            name: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        }
        await fetch(this.url,{
            method: 'POST',
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).catch(error => console.error('error',error));
    }

    async read(id: string | undefined){
        const res = await fetch(`${this.url}/${id}`);
        return await res.json();
    }

    async update(id: string | undefined,name:HTMLInputElement,lastName:HTMLInputElement,email:HTMLInputElement,password:HTMLInputElement){
        const updatedUser = {
            name: name.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
        }
        await fetch(this.url,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(updatedUser)
        }).catch(error => console.error('error',error));
    }

    async delete(id: string | undefined){
        await fetch(`${this.url}/${id}`,{
            method: 'DELETE'
        }).catch(error => console.error('error',error));
    }
}