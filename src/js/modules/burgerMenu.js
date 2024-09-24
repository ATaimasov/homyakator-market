import { navState } from "../services/fixedNavigation.js";
import { $bagList, closeBag } from "./bagMenu.js";

// burger-menu
const $burgers  = $('.burger-line');

function burgerMenu () {
  
  $('#burger-menu').on('click', () => {

    if((navState.isBagOpen && !navState.isBurgerOpen) || (navState.isBagOpen && navState.isBurgerOpen)) {
      navState.isBurgerOpen = true
    } else {
      navState.isBurgerOpen  = !navState.isBurgerOpen; 
    }
  
    if (navState.isBurgerOpen) {
      $('#header-list').addClass('header-list--burger-open');
      $('#nav-list').removeClass('header-nav--hidden');
      $('body').css('overflow', 'hidden');
      $bagList.removeClass('cart-open');
  
      if($(window).width() < 767) {

        if(navState.isBagOpen) {
          closeBag();
          navState.isBagOpen = false;
        }

      }
    } else {
      closeBurger();
    }
  
  $burgers.each (() => {
    if (navState.isBurgerOpen) {
      $burgers.addClass('burger-line--opened');
    } else {
      $burgers.removeClass('burger-line--opened');
    }
  })
  
  $('.header__link-inner-link').on('click', () => {
    if (navState.isBurgerOpen) {
      closeBurger();
      navState.isBurgerOpen  = !navState.isBurgerOpen; 

      $burgers.each (() => {
        $burgers.removeClass('burger-line--opened');
      })

    } 
  
  }); 
  
  })

}
burgerMenu();



function closeBurger() {
    $('#header-list').removeClass('header-list--burger-open');
    $('#nav-list').addClass('header-nav--hidden');
    $('body').css('overflow', 'auto'); 
  }


  export { $burgers, closeBurger }