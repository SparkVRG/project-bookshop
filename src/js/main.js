import '../css/style.css';
import * as slider from './slider.js';
import * as books from './books.js';

let links = document.querySelectorAll('a');

links.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
    });
});

let navItems = document.querySelectorAll('.nav__link');

navItems.forEach(item => {
    item.addEventListener('click', event => {
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