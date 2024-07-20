export function showConfirm(message:string): Promise<boolean>{
    return new Promise((resolve)=>{
        const confirmDialog = <HTMLDivElement> document.getElementById('confirmDialog');
        const confirmYes = <HTMLButtonElement> document.getElementById('confirmYes');
        const confirmNo = <HTMLButtonElement> document.getElementById('confirmNo')

        confirmDialog.querySelector('h3')!.textContent= message;
        confirmDialog.style.display= 'block';

        confirmYes.onclick = () =>{
            confirmDialog.style.display = 'none';
            resolve(true);
        };
        confirmNo.onclick = () =>{
            confirmDialog.style.display = 'none';
            resolve(false);
        };
    });
}

export function booksModification(message:string): void{
    const confirmCreation = <HTMLDivElement> document.getElementById('bookCreated');
    const created = <HTMLButtonElement> document.getElementById('creationSuccess')

    confirmCreation.querySelector('h3')!.textContent= message;
    confirmCreation.style.display = 'block';

    created.onclick = () =>{
        confirmCreation.style.display = 'none'
    };
}