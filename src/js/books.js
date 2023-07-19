let apiKey = 'AIzaSyBvtqvr61MPkM6LdRkBrQrK3aX9PP2LXsg';
let currentSubject = document.querySelector('.books-menu__item_active .books-menu__link').innerHTML;
let startIndex = 0;
let booksPlace = document.querySelector('.books-content__list');
let menuItems = document.querySelectorAll('.books-menu__link');
let loadButton = document.querySelector('.books-content__button_load');
let cart = [];

if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

updateCartElement();

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        let parent = item.parentNode;

        if (!parent.classList.contains('books-menu__item_active')) {
            let currentActiveItem = document.querySelector('.books-menu__item_active');

            currentSubject = item.innerHTML;
            startIndex = 0;
            booksPlace.innerHTML = '';

            addBooks();

            currentActiveItem.classList.toggle('books-menu__item_active');
            parent.classList.toggle('books-menu__item_active');
        }
    });
});

addBooks();

loadButton.addEventListener('click', addBooks);

function addBooks() {
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${currentSubject}"&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`;
    startIndex += 6;
    let result = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            response.items.forEach(item => {
                let id = item.id;
                
                // Иногда API передаёт те книги, которые уже были
                // Эта проверка их не пропускает
                if (booksPlace.innerHTML.includes(id)) {
                    return;
                }

                let image = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'images/books-placeholder.jpg';
                let authors = '';

                if (item.volumeInfo.authors) {
                    item.volumeInfo.authors.forEach((item, index) => {
                        if (index == 0) {
                            authors += item;
                        } else {
                            authors += `, ${item}`;
                        }
                    });

                    if (authors.split(', ').length > 3) {
                        authors = `${authors.split(', ').slice(0, 3).join(', ')} and others`;
                    }
                }

                let title = item.volumeInfo.title;

                let ratingElement = '';

                if (item.volumeInfo.averageRating) {
                    let ratingCount = item.volumeInfo.averageRating;
                    let reviewCount = item.volumeInfo.ratingsCount;

                    ratingElement = document.createElement('div');
                    ratingElement.className = 'books-content__rating';
                
                    ratingElement.innerHTML = `
                        <span class="books-content__rating-star"></span>
                        <span class="books-content__rating-star"></span>
                        <span class="books-content__rating-star"></span>
                        <span class="books-content__rating-star"></span>
                        <span class="books-content__rating-star"></span>
                    `;

                    for (let i = 0; i < ratingCount; i++) {
                        let star = ratingElement.querySelectorAll('.books-content__rating-star')[i];
                        star.classList.add('books-content__rating-star_active');
                    }

                    ratingElement = `
                        <div class="books-content__rating">
                            ${ratingElement.innerHTML}
                            <span class="books-content__rating-count">${reviewCount} review</span>
                        </div>
                    `;
                }

                let description = item.volumeInfo.description ? item.volumeInfo.description.slice(0, 100) + '...' : '';
                let price = item.saleInfo.retailPrice ? `${item.saleInfo.retailPrice.amount} ${item.saleInfo.retailPrice.currencyCode}` : 'NOT FOR SALE';

                let button = '';

                if (price != 'NOT FOR SALE') {
                    if (cart.includes(id)) {
                        button = '<button class="books-content__button books-content__button_purchase">IN THE CART</button>';
                    } else {
                        button = '<button class="books-content__button books-content__button_purchase">BUY NOW</button>';
                    }
                }

                let bookItem = `
                    <div class="books-content__item" id="${id}">
                        <div class="books-content__leftside">
                            <img src="${image}" alt="Book cover" class="books-content__cover">
                        </div>
                        <div class="books-content__rightside">
                            <p class="books-content__author">${authors}</p>
                            <h2 class="books-content__title">${title}</h2>
                            ${ratingElement}
                            <p class="books-content__description">${description}</p>
                            <p class="books-content__price">${price}</p>
                            <div class="books-content__purchase">
                                ${button}
                            </div>
                        </div>
                    </div>
                `;

                result += bookItem;
            });

            booksPlace.innerHTML += result;

            let bookButtons = booksPlace.querySelectorAll('.books-content__button_purchase');
            
            bookButtons.forEach(item => {
                item.addEventListener('click', (event) => {
                    let id = event.target.closest('.books-content__item').id;

                    if (event.target.innerHTML == 'BUY NOW') {
                        cart.push(id);
                        event.target.innerHTML = 'IN THE CART';
                    } else {
                        let index = cart.indexOf(id);

                        cart.splice(index, 1);
                        event.target.innerHTML = 'BUY NOW';
                    }

                    localStorage.setItem('cart', JSON.stringify(cart));

                    updateCartElement();
                });
            });
        });
}

function updateCartElement() {
    let cartCounter = document.querySelector('.actions__shop-counter');

    if (cart.length > 0) {
        cartCounter.classList.add('actions__shop-counter_active');
    } else {
        cartCounter.classList.remove('actions__shop-counter_active');
    }

    cartCounter.innerHTML = cart.length;
}