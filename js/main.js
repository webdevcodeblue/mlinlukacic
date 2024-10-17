(function ($) {
  'use strict';

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar
  $('.fixed-top').css('top', $('.top-bar').height());
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $('.fixed-top').addClass('bg-dark').css('top', 0);
    } else {
      $('.fixed-top').removeClass('bg-dark').css('top', $('.top-bar').height());
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Header carousel
  $('.header-carousel').owlCarousel({
    autoplay: false,
    smartSpeed: 1500,
    loop: true,
    nav: true,
    dots: false,
    items: 1,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Testimonials carousel
  $('.testimonial-carousel').owlCarousel({
    autoplay: false,
    smartSpeed: 1000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

// Funkcija za postavljanje jezika
function setLanguage(lang) {
  var elements = document.querySelectorAll('[data-hr], [data-en]');
  elements.forEach(function (element) {
    if (lang === 'hr') {
      element.textContent = element.getAttribute('data-hr');
    } else if (lang === 'en') {
      element.textContent = element.getAttribute('data-en');
    }
  });

  // Spremi jezik u localStorage
  localStorage.setItem('selectedLanguage', lang);
}

function setLanguageBasedOnCountry() {
  const savedLang = localStorage.getItem('selectedLanguage');
  if (savedLang) {
    setLanguage(savedLang);
  } else {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => {
        const country = data.country_name;
        const exYuCountries = [
          'Croatia',
          'Bosnia and Herzegovina',
          'Serbia',
          'Slovenia',
          'Montenegro',
          'North Macedonia',
          'Kosovo',
        ];
        if (exYuCountries.includes(country)) {
          setLanguage('hr');
        } else {
          setLanguage('en');
        }
      })
      .catch(() => {
        setLanguage('hr');
      });
  }
}

window.onload = setLanguageBasedOnCountry;
