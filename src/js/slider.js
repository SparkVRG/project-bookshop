let items = [
    'images/slider-image-1.png',
    'images/slider-image-2.png',
    'images/slider-image-3.png'
];

let currentItem = 0;
let dots = document.querySelectorAll('.slider__dots-item');

dots.forEach((item, index) => {
    item.addEventListener('click', function() {
        currentItem = index;

        changeSlide(index);
    });
});

let intervalId = setInterval(autoplay, 5000);

function changeSlide(index) {
    clearInterval(intervalId);
    intervalId = setInterval(autoplay, 5000);
    
    let image = document.querySelector('.slider__item');
    let currentActiveDot = document.querySelector('.slider__dots-item_active');

    image.src = items[index];
    currentActiveDot.classList.toggle('slider__dots-item_active');
    dots[index].classList.toggle('slider__dots-item_active');
}

function autoplay() {
    let lastItem = items.length - 1;

    if (currentItem >= lastItem) {
        currentItem = 0;
    } else {
        currentItem++;
    }

    changeSlide(currentItem);
}