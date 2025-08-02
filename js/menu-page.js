/*window.addEventListener('scroll', function () {
   const header = document.querySelector('.header');
   if (window.scrollY > 60) {
     header.classList.add('sticky');
   } else {
     header.classList.remove('sticky');
   }
 });

*/
  const toggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

// header _____________________________________________________________________________________________________________________________________________

// تب‌ها
// مدیریت تب‌ها
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // حذف اکتیو از همه تب‌ها
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // اکتیو کردن تب انتخاب شده
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.tab);
    target.classList.add('active');

    // برای اطمینان از نمایش Grid بعد از برگشت
    target.style.display = 'block';
  });
});

// اسکرول نرم دسته‌بندی
document.querySelectorAll('.category-bar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    window.scrollTo({
      top: target.offsetTop - 70,
      behavior: 'smooth'
    });
  });
});

// اسکرول با فلش‌ها
document.querySelectorAll('.category-bar-wrapper').forEach(wrapper => {
  const bar = wrapper.querySelector('.category-bar');
  const leftBtn = wrapper.querySelector('.scroll-btn.left');
  const rightBtn = wrapper.querySelector('.scroll-btn.right');

  leftBtn.addEventListener('click', () => bar.scrollBy({ left: 150, behavior: 'smooth' }));
  rightBtn.addEventListener('click', () => bar.scrollBy({ left: -150, behavior: 'smooth' }));
});

/* ____________________________________________ Search Box ____________________________________________________________________________ */ 

document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const searchInput = document.getElementById('productSearch');
  const allCards = document.querySelectorAll('.product-card');
  const allSections = document.querySelectorAll('.menu-section');
  const allTabs = document.querySelectorAll('.tab-content');

  function setActiveTab(tabId) {
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    tabContents.forEach(tab => {
      tab.classList.toggle('active', tab.id === tabId);
    });
  }

  function filterProducts(searchValue) {
    if (!searchValue) {
      // سرچ خالی: همه چیز رو به حالت اولیه برگردون
      allCards.forEach(card => card.style.display = '');
      allSections.forEach(section => section.style.display = '');
      // فقط تب فعال رو نمایش بده
      tabContents.forEach(tab => {
        if (tab.classList.contains('active')) {
          tab.style.display = 'block';
        } else {
          tab.style.display = 'none';
        }
      });
      return;
    }

    // سرچ داریم، پس همه تب‌ها نمایش داده شوند
    tabContents.forEach(tab => (tab.style.display = 'block'));

    // فیلتر کارت‌ها
    allCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(searchValue) ? '' : 'none';
    });

    // مخفی کردن سکشن‌هایی که کارت قابل نمایش ندارند
    allSections.forEach(section => {
      const visibleCards = Array.from(section.querySelectorAll('.product-card')).filter(card => card.style.display !== 'none');
      section.style.display = visibleCards.length ? 'block' : 'none';
    });
  }

  // تنظیم تب‌ها هنگام کلیک روی دکمه
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveTab(btn.dataset.tab);
      // اگر سرچ خالی نیست، همه تب‌ها باز هستند، نیازی به تغییر نمایش نیست
      if (!searchInput.value.trim()) {
        // فقط تب فعال رو نمایش بده
        tabContents.forEach(tab => {
          tab.style.display = tab.classList.contains('active') ? 'block' : 'none';
        });
      }
    });
  });

  // هندل سرچ
  searchInput.addEventListener('input', e => {
    const val = e.target.value.trim().toLowerCase();
    filterProducts(val);
  });

  // حالت اولیه: نمایش فقط تب اول فعال
  if (tabBtns.length > 0) {
    setActiveTab(tabBtns[0].dataset.tab);
  }
});

