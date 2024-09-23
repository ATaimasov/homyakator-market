import { navigationState } from "../services/fixedNavigation.js";
import { $bagList } from "./bagMenu.js";

// burger-menu
const $burgers  = $('.burger-line');

function burgerMenu () {
  
  $('#burger-menu').on('click', () => {

    if((isBagOpen && !isBurgerOpen) || (isBagOpen && isBurgerOpen)) {
      isBurgerOpen = true
    } else {
      isBurgerOpen  = !isBurgerOpen; 
    }
  
    if (isBurgerOpen) {
      $('#header-list').addClass('header-list--burger-open');
      $('#nav-list').removeClass('header-nav--hidden');
      $('body').css('overflow', 'hidden');
      $bagList.removeClass('cart-open');
  
      if($(window).width() < 767) {

        if(isBagOpen) {
          closeBag();
          isBagOpen = false;
        }

      }
    } else {
      closeBurger();
    }
  
  $burgers.each (() => {
    if (isBurgerOpen) {
      $burgers.addClass('burger-line--opened');
    } else {
      $burgers.removeClass('burger-line--opened');
    }
  })
  
  $('.header__link-inner-link').on('click', () => {
    if (isBurgerOpen) {
      closeBurger();
      isBurgerOpen  = !isBurgerOpen; 

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


  export { $burgers }