export class cardTemplate {
    constructor(container) {
        this.container = container;
    }
    render(book) {
        /* card */
        const card = document.createElement('div');
        card.className = 'card swiper-slide';
        /* div title content */
        const divTitle = document.createElement('div');
        divTitle.className = 'title-content';
        const overlay = document.createElement('span');
        overlay.className = 'overlay';
        const title = document.createElement('h2');
        title.className = 'book-title';
        title.textContent = book.title;
        /* appending title content elements */
        divTitle.appendChild(overlay);
        divTitle.appendChild(title);
        /* div card content */
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        const author = document.createElement('h3');
        author.className = 'author';
        author.textContent = book.author;
        const description = document.createElement('p');
        description.className = 'description';
        description.textContent = book.description;
        const publicationDate = document.createElement('p');
        publicationDate.className = 'publication-date';
        publicationDate.textContent = `${book.publicationDate}`;
        /* Appending card content elements */
        cardContent.appendChild(author);
        cardContent.appendChild(description);
        cardContent.appendChild(publicationDate);
        /* div buttons */
        const buttons = document.createElement('div');
        buttons.className = 'buttons';
        const btnUpdate = document.createElement('button');
        btnUpdate.className = 'btn-card';
        btnUpdate.dataset.id = book.id;
        btnUpdate.dataset.action = 'update';
        btnUpdate.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn-card';
        btnDelete.dataset.id = book.id;
        btnDelete.dataset.action = 'delete';
        btnDelete.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
        buttons.appendChild(btnUpdate);
        buttons.appendChild(btnDelete);
        /* Appending all to the card */
        card.appendChild(divTitle);
        card.appendChild(cardContent);
        card.appendChild(buttons);
        /* Appending card to the container */
        this.container.appendChild(card);
    }
}
