import { navState }   from "../services/fixedNavigation.js";
import { $burgers, closeBurger } from "./burgerMenu.js";

const $bag     = $('#cart__img'),
      $bagList = $('#cart-list');


function bagMenu() {

    $bag.on('click', () => {
      if((!navState.isBagOpen && navState.isBurgerOpen) 
        || 
        (navState.isBagOpen && navState.isBurgerOpen)) {
            navState.isBagOpen = true;
            $burgers.removeClass('burger-line--opened');
    } else {
        navState.isBagOpen  = !navState.isBagOpen;
      }
  
      if (navState.isBagOpen) {
        $bagList.addClass('cart-open');
  
        if($(window).width() < 767) {
          $('body').css('overflow', 'hidden');
  
          if(navState.isBurgerOpen) {
            closeBurger()
            navState.isBurgerOpen = false;
          }
  
        }
      } else {
        closeBag()
      }
    })
  }
  bagMenu()
  
  function closeBag() {
    $bagList.removeClass('cart-open');
    $('body').css('overflow', 'auto');
  }


  

  export {$bagList, closeBag}