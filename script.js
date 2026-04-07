/* =====================
   ALWAYS START AT TOP
   ===================== */
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
// Clear any URL hash and scroll to top on every load
window.addEventListener('load', () => {
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }
    window.scrollTo(0, 0);
});

/* =====================
   MOBILE MENU
   ===================== */
const navbar  = document.querySelector('.navbar');
const menuBtn = document.querySelector('#menu-btn');

menuBtn.onclick = () => {
    navbar.classList.toggle('active');
};

// Close menu when a nav link is clicked
navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

/* =====================
   HEADER SCROLL BEHAVIOR
   ===================== */
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    // Close mobile menu on scroll
    navbar.classList.remove('active');

    // Shrink header after scrolling down
    if (window.scrollY > 60) {
        header.classList.add('shrunk');
    } else {
        header.classList.remove('shrunk');
    }

    // Hide header on scroll down, show on scroll up
    if (window.scrollY > lastScrollY && window.scrollY > 120) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    lastScrollY = window.scrollY;
});

/* =====================
   HERO SLIDESHOW
   ===================== */
(function () {
    const slides   = document.querySelectorAll('.hero-slide');
    const dots     = document.querySelectorAll('.hero-dot');
    let current    = 0;
    let autoTimer;

    function showSlide(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function nextSlide() { showSlide(current + 1); }

    function startAuto() {
        autoTimer = setInterval(nextSlide, 4500);
    }

    function resetAuto() {
        clearInterval(autoTimer);
        startAuto();
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { showSlide(i); resetAuto(); });
    });

    // Touch/swipe support for hero
    let touchStartX = 0;
    const heroSlideshow = document.querySelector('.hero-slideshow');
    heroSlideshow.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    heroSlideshow.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) {
            nextSlide();
            resetAuto();
        }
    });

    startAuto();
})();

/* =====================
   PHOTO GALLERY
   ===================== */
(function () {
    // All gallery images — paste new Facebook photo URLs below as you add them
    const galleryImages = [
        'facebook12.jpg',
        'https://scontent-sjc3-1.xx.fbcdn.net/v/t39.30808-6/605502456_1404821444678095_7096853418215772953_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=nEER07PRAIYQ7kNvwEGiDy8&_nc_oc=AdoC3b3n1PQUqLBmZNg14Rc5Zr05m8eLQo1ccyVHYTUjyrSCjlwYNfb6WrdEIA26Bgh7I2dEMDCGMoTs2s6X7vzS&_nc_zt=23&_nc_ht=scontent-sjc3-1.xx&_nc_gid=VyI8qiIH9j0g62POVH03WA&_nc_ss=7a3a8&oh=00_Af09JO5c9A5EymCgfNyMJ_oKyY5PYwHNVRf9FSMLX14gIw&oe=69DA0B1C',
        'https://scontent-sjc6-1.xx.fbcdn.net/v/t39.30808-6/481013071_1160236229136619_227036905087979205_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=awtQ-UvJ-aEQ7kNvwFdm6fe&_nc_oc=AdoEmE5UmuwNEXcaumcIGeTkOV8bK4RyzWxXJokIw6e494mKtTzQh4SQZxXTfRc4wxvJoUm77qqVtXD5pB6043wi&_nc_zt=23&_nc_ht=scontent-sjc6-1.xx&_nc_gid=HKOLnD6IIxJDv2u2K_KZYA&_nc_ss=7a3a8&oh=00_Af3yJSDVrVswv3WKcMPkNmhcQP4y4qpj79sPzm8-4uX4Ew&oe=69DA091D',
    ];

    // Per-image object-position (use 'center center' as default, adjust to reveal faces)
    const galleryPositions = [
        'center center',
        'center 5%',
        'center center',
    ];

    const featured   = document.getElementById('gallery-featured');
    const thumbs     = document.querySelectorAll('.gallery-thumb');
    const prevBtn    = document.querySelector('.gallery-prev-btn');
    const nextBtn    = document.querySelector('.gallery-next-btn');
    const countCur   = document.getElementById('gallery-current');
    const countTotal = document.getElementById('gallery-total');
    let current      = 0;

    // Set total count
    countTotal.textContent = galleryImages.length;

    function showImage(index) {
        current = (index + galleryImages.length) % galleryImages.length;

        // Fade out then swap
        featured.style.opacity = '0';
        setTimeout(() => {
            featured.src = galleryImages[current];
            featured.style.objectPosition = galleryPositions[current] || 'center center';
            featured.style.opacity = '1';
        }, 200);

        countCur.textContent = current + 1;

        // Update active thumbnail
        thumbs.forEach((t, i) => {
            t.classList.toggle('active', i === current);
        });

        // Scroll active thumb into view
        if (thumbs[current]) {
            thumbs[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }

    function nextImage() { showImage(current + 1); }
    function prevImage() { showImage(current - 1); }

    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    thumbs.forEach((thumb, i) => {
        thumb.addEventListener('click', () => showImage(i));
    });

    // Touch/swipe support for gallery
    let touchStartX = 0;
    const galleryWrap = document.querySelector('.gallery-main-wrap');
    galleryWrap.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    galleryWrap.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? nextImage() : prevImage();
        }
    });
})();
