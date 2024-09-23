// Libs
import './libs/jquery.min.js';

// Plugins
import './plugins/slick.min.js';

// Services
import './services/modal.js';
import './services/fixedNavigation.js';
import './services/carousel.js';


// Modules
import './modules/form.js';
import './modules/bagMenu.js';
import './modules/bagCounter.js';
import './modules/burgerMenu.js';
import './modules/scrollingScript.js';
import './modules/filterScript.js';




// click on contact-header refer you to first name input
$('#contact-header').click(() => {
    $('#contact-form-first-name').trigger('focus');
  })
  


//) filter and bag-counter interaction  with enter key

$(document).on('keydown', (key) => {
    if (key.which === 13) {
      const focusedElement = document.activeElement;
      if ($(focusedElement).hasClass('goods__filter-item')) {
        $(focusedElement).trigger('click');
      }
  
      if ($(focusedElement).hasClass('goods-card')) {
        $(focusedElement).children().eq(1).children().eq(2).trigger('click')
      }
      
    }
  })
  
  
// Pageup
$('#page-up').click((e) => {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 300);
})


$(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
        console.log('1');
      $('#page-up').fadeIn();
    } else {
        console.log('2');
      $('#page-up').fadeOut();
    }
  });