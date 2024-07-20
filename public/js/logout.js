var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { showConfirm } from "./modals.js";
export function logOut(buttonId, redirectUrl) {
    const logOut = document.getElementById('logout-btn');
    if (logOut) {
        logOut.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const confirmLogout = yield showConfirm('Are you sure you want to logout?');
            if (confirmLogout) {
                /* delete token from local storage */
                localStorage.removeItem('token');
                window.location.href = redirectUrl;
            }
        }));
    }
}
