window.addEventListener('scroll', function () {
   const header = document.querySelector('.header');
   if (window.scrollY > 60) {
     header.classList.add('sticky');
   } else {
     header.classList.remove('sticky');
   }
 });


  const toggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });


