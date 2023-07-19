function toggleNavItems(event) {
    let currentActiveItem = document.querySelector('.nav__link_active');
    currentActiveItem.classList.toggle('nav__link_active');

    event.target.classList.toggle('nav__link_active');
};

function toggleNavBurger() {
    let navList = document.querySelector('.nav__list');
    navList.classList.toggle('nav__list_active');
}

export { toggleNavItems, toggleNavBurger };