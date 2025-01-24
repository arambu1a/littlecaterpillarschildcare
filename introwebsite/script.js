let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');


document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
}


document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>{
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// When the user scrolls down 20px from top of document, make navbar smaller 

const header = document.querySelector('.header');
let lastScrollY = window.scrollY; // Tracks the last known scroll position

window.addEventListener('scroll', () => {
    if (window.scrollY > 70) {
        // Scrolling down: shrink the header
        header.classList.add('shrunk');
    } else {
        // At the top of the page: restore original size
        header.classList.remove('shrunk');
    }

    // Check scroll direction to hide or show header
    if (window.scrollY > lastScrollY) {
        // Scrolling down: hide the header
        header.classList.add('hidden');
    } else {
        // Scrolling up: show the header
        header.classList.remove('hidden');
    }

    lastScrollY = window.scrollY; // Update the last known position
});
