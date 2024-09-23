

import { navState } from "../services/fixedNavigation.js";
import { $nav, $navAppearing, $navHidden } from "../services/fixedNavigation.js";
import { slider } from "../services/carousel.js";
import {filterItems} from "../modules/filterScript.js";


// scroll scripts

const MakeHighlighted = (highlightedTarget) => {
    slider.slick('slickUnfilter');
    filterItems.removeClass("goods__filter-item--active");
  
    $(highlightedTarget).trigger('click');
  
    if (!$(highlightedTarget).hasClass('goods-card__info-bag--script-highlighted')) {
    $(highlightedTarget).addClass('goods-card__info-bag--script-highlighted');
    setTimeout( () => {
    $(highlightedTarget).removeClass('goods-card__info-bag--script-highlighted');
    }, 3000)
    }
  }
  
  function scrolling(target, elementToScroll) {
    navState.isScrolling = true;
  
    $nav.addClass($navHidden);
    $nav.removeClass($navAppearing);
  
    target.preventDefault();
    $('html, body').animate({
    scrollTop: elementToScroll.offset().top 
    }, 100)
  
    setTimeout(() => {
      navState.isScrolling = false;
    }, 1000)
  
  }
  
  $('#try-cornucopia-crunch').on('click', (event) =>  {
    MakeHighlighted('#cornucopia-crunch-bag');
    slider.slick('goTo', 8);
    scrolling(event, $("#buy"));
  }
  );
  
  $('#try-hamster-harvest').on('click', (event) =>  {
    MakeHighlighted('#hamster-harvest-bag');
    slider.slick('goTo', 14);
    scrolling(event, $("#buy"));
  }
  );
  
  $('#try-paws-crisps').on('click', (event) =>  {
    MakeHighlighted('#Paws-Crips-bag');
    slider.slick('goTo', 17);
    scrolling(event, $("#buy"));
  }
  );
  
  $('#shop-healthy').on('click', (event) =>  {
    MakeHighlighted('#healthy');
    scrolling(event, $("#buy"));
  
  })
  
  $('#shop-exotic').on('click', (event) => {
    MakeHighlighted('#exotic');
    scrolling(event, $("#buy"));
  })
  
  $('#promotions').on('click', (event) => {
    MakeHighlighted('#discount');
    scrolling(event, $("#buy"));
  })
  
  
  $('#shop-now-button-link, #goods-link').on('click', (event) => {
    scrolling(event, $("#buy"));
  });
  
  $('#new-goods-link').on('click', (event) => {
    scrolling(event, $("#new-goods"));
  });
  
  $('#contact-link').on('click', (event) => {
    scrolling(event, $("#contact-form"));
    
  });
  
  $('#footer__contact-link').on('click', (event) => {
    scrolling(event, $("#contact-form"));
    MakeHighlighted('#contact-form');
  })
  
  $('#footer__why-us-link').on('click', (event) => {
    scrolling(event, $("#about-us"));
  })
  