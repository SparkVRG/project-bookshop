import '../css/style.css';
import { disableLink } from './disableLink';
import { sliderItems } from './sliderItems';

let links = document.querySelectorAll('a');

links.forEach(item => {
    item.addEventListener('click', disableLink);
});

let navItems = document.querySelectorAll('.nav__link');

navItems.forEach(item => {
    item.addEventListener('click', (event) => {
        let currentActiveItem = document.querySelector('.nav__link_active');

        currentActiveItem.classList.toggle('nav__link_active');
        event.target.classList.toggle('nav__link_active');
    });
});

let navBurgerButton = document.querySelector('.nav__burger-button');

navBurgerButton.addEventListener('click', () => {
    let navList = document.querySelector('.nav__list');
    navList.classList.toggle('nav__list_active');
});

let sliderCurrentItem = 0;
let sliderDots = document.querySelectorAll('.slider__dots-item');

sliderDots.forEach(function(item, index) {
    item.addEventListener('click', function() {
        sliderCurrentItem = index;

        changeSlide(index);
    });
});

let sliderIntervalId = setInterval(autoplaySlider, 5000);

function changeSlide(slideIndex) {
    clearInterval(sliderIntervalId);
    sliderIntervalId = setInterval(autoplaySlider, 5000);
    
    let image = document.querySelector('.slider__item');
    let currentActiveDot = document.querySelector('.slider__dots-item_active');

    image.src = sliderItems[slideIndex];
    currentActiveDot.classList.toggle('slider__dots-item_active');
    sliderDots[slideIndex].classList.toggle('slider__dots-item_active');
}

function autoplaySlider() {
    let lastItem = sliderItems.length - 1;

    if (sliderCurrentItem >= lastItem) {
        sliderCurrentItem = 0;
    } else {
        sliderCurrentItem++;
    }

    changeSlide(sliderCurrentItem);
}

let booksApiKey = 'AIzaSyBvtqvr61MPkM6LdRkBrQrK3aX9PP2LXsg';
let booksCurrentSubject = document.querySelector('.books-menu__item_active .books-menu__link').innerHTML;
let booksStartIndex = 0;
let booksMenuLink = document.querySelectorAll('.books-menu__link');

booksMenuLink.forEach(item => {
    item.addEventListener('click', () => {
        let parent = item.parentNode;

        if (!parent.classList.contains('books-menu__item_active')) {
            booksCurrentSubject = item.innerHTML;
            booksStartIndex = 0;
            document.querySelector('.books-content__list').innerHTML = '';

            addBooks();

            let currentActiveItem = document.querySelector('.books-menu__item_active');

            parent.classList.toggle('books-menu__item_active');
            currentActiveItem.classList.toggle('books-menu__item_active');
        }
    });
});

addBooks();

let booksLoadButton = document.querySelector('.books-content__button_load');

booksLoadButton.addEventListener('click', addBooks);

function addBooks() {
    let apiUrl = `https://www.googleapis.com/books/v1/volumes?q="subject:${booksCurrentSubject}"&key=${booksApiKey}&printType=books&startIndex=${booksStartIndex}&maxResults=6&langRestrict=en`;
    booksStartIndex += 6;
    let result = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            response.items.forEach(item => {
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
                        authors = authors.split(', ').slice(0, 3).join(', ') + ' and others';
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
                        ratingElement.querySelectorAll('.books-content__rating-star')[i].classList.add('books-content__rating-star_active');
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

                let button = (price != 'NOT FOR SALE') ? '<button class="books-content__button books-content__button_purchase">BUY NOW</button>' : '';

                let newBookItem = `
                    <div class="books-content__item">
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

                if (!document.querySelector('.books-content__list').innerHTML.includes(`${title}`)) {
                    result += newBookItem;
                }
            });

            document.querySelector('.books-content__list').innerHTML += result;
        });
}