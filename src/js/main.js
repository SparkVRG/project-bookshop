import '../css/style.css';
import './slider.js';
import './books.js';
import { toggleNavItems, toggleNavBurger } from './navActive.js';

let links = document.querySelectorAll('a');

links.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
    });
});

let navItems = document.querySelectorAll('.nav__link');
let navBurgerButton = document.querySelector('.nav__burger-button');

navItems.forEach(item => {
    item.addEventListener('click', toggleNavItems);
});

navBurgerButton.addEventListener('click', toggleNavBurger);