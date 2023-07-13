import '../css/style.css';

let navItems = document.querySelectorAll('.nav__link');

navItems.forEach(item => {
    item.addEventListener('click', toggleNavActive);
});

function toggleNavActive(event) {
    let currentActiveItem = document.querySelector('.nav__link_active');

    currentActiveItem.classList.toggle('nav__link_active');
    event.target.classList.toggle('nav__link_active');
}

let navBurgerButton = document.querySelector('.nav__burger-button');

navBurgerButton.addEventListener('click', toggleNavBurger);

function toggleNavBurger() {
    let navList = document.querySelector('.nav__list');
    
    navList.classList.toggle('nav__list_active');
}

let sliderItems = [
    'images/slider-image-1.png',
    'images/slider-image-2.png',
    'images/slider-image-3.png'
];

let sliderCurrentItem = 0;
let sliderDots = document.querySelectorAll('.slider__dots-item');

let intervalId = setInterval(autoplaySlider, 5000);

function changeSlide(slideIndex) {
    clearInterval(intervalId);
    intervalId = setInterval(autoplaySlider, 5000);
    
    let image = document.querySelector('.slider__item');
    let currentActiveDot = document.querySelector('.slider__dots-item_active');

    image.src = sliderItems[slideIndex];
    currentActiveDot.classList.toggle('slider__dots-item_active');
    sliderDots[slideIndex].classList.toggle('slider__dots-item_active');
}

sliderDots.forEach(function(item, index) {
    item.addEventListener('click', function() {
        sliderCurrentItem = index;

        changeSlide(index);
    });
});

function autoplaySlider() {
    let lastItem = sliderItems.length - 1;

    if (sliderCurrentItem >= lastItem) {
        sliderCurrentItem = 0;
    } else {
        sliderCurrentItem++;
    }

    changeSlide(sliderCurrentItem);
}