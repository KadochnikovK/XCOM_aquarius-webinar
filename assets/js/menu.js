document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.menu__hamburger');
    const menuList = document.querySelector('.menu__list');
    const heroContent = document.querySelector('.hero__content');
    const heroCircle = document.querySelector('.hero__circle');
    const heroPlanet = document.querySelector('.hero__planet');

    function closeMenu() {
        hamburger.classList.remove('menu__hamburger--active');
        menuList.classList.remove('menu__list--active');
        heroContent.classList.remove('hero__content--hidden');
        heroCircle.classList.remove('hero__circle--hidden');
        heroPlanet.classList.remove('hero__planet--hidden');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        hamburger.classList.toggle('menu__hamburger--active');
        menuList.classList.toggle('menu__list--active');
        heroContent.classList.toggle('hero__content--hidden');
        heroCircle.classList.toggle('hero__circle--hidden');
        heroPlanet.classList.toggle('hero__planet--hidden');

        document.body.style.overflow = menuList.classList.contains('menu__list--active')
            ? 'hidden'
            : '';
    }

    hamburger.addEventListener('click', toggleMenu);

    const menuLinks = document.querySelectorAll('.menu__link');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    
    const allButtons = document.querySelectorAll('button, .button, [type="button"], [type="submit"]');
    allButtons.forEach(button => {
      
        if (!button.classList.contains('menu__hamburger')) {
            button.addEventListener('click', closeMenu);
        }
    });


    window.addEventListener('resize', function () {
        if (window.innerWidth >= 640) {
            closeMenu();
        }
    });

    
    document.addEventListener('click', function (event) {
       
        if (menuList.classList.contains('menu__list--active') &&
            !menuList.contains(event.target) &&
            !hamburger.contains(event.target)) {
            closeMenu();
        }
    });
});