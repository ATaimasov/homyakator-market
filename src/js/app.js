// Libs
import './libs/jquery.min.js';

// Plugins
import './plugins/slick.min.js';

// Services
import './services/modal.js';
import './services/fixedNavigation.js';
import './services/carousel.js';
import './services/pageUp.js';

// utils



// Modules
import './modules/form.js';
import './modules/bagMenu.js';
import './modules/bagCounter.js';
import './modules/burgerMenu.js';
import './modules/scrollingScript.js';
import './modules/filterScript.js';



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
  
  


  