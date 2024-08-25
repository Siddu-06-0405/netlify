document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navbar = document.querySelector('.navbar');
    const navList = document.querySelector('.nav-list');
    let rightNav = document.querySelector('.rightnav'); // Define rightNav here

    burger.addEventListener('click', () => {
        console.log('Burger menu clicked');
        console.log('rightNav:', rightNav);
        console.log('navList:', navList);
        console.log('navbar:', navbar);
        rightNav.classList.toggle('v-class-resp');
        navList.classList.toggle('v-class-resp');
        navbar.classList.toggle('h-nav-resp');
    });
});
