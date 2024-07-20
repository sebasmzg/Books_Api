export function showConfirm(message) {
    return new Promise((resolve) => {
        const confirmDialog = document.getElementById('confirmDialog');
        const confirmYes = document.getElementById('confirmYes');
        const confirmNo = document.getElementById('confirmNo');
        confirmDialog.querySelector('h3').textContent = message;
        confirmDialog.style.display = 'block';
        confirmYes.onclick = () => {
            confirmDialog.style.display = 'none';
            resolve(true);
        };
        confirmNo.onclick = () => {
            confirmDialog.style.display = 'none';
            resolve(false);
        };
    });
}
export function booksModification(message) {
    const confirmCreation = document.getElementById('bookCreated');
    const created = document.getElementById('creationSuccess');
    confirmCreation.querySelector('h3').textContent = message;
    confirmCreation.style.display = 'block';
    created.onclick = () => {
        confirmCreation.style.display = 'none';
    };
}
