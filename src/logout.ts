import { showConfirm } from "./modals.js";

export function logOut(buttonId:string,redirectUrl: string): void {
    const logOut = <HTMLButtonElement> document.getElementById('logout-btn');

    if(logOut){
        logOut.addEventListener('click', async ()=>{
            const confirmLogout = await showConfirm('Are you sure you want to logout?');
            if(confirmLogout){
                /* delete token from local storage */
                localStorage.removeItem('token');
                window.location.href = redirectUrl;
            }
        });
    }
}