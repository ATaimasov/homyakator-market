let cartItems = {};

;(function ($, undefined) {

// throttle scroll script

function throttle (func, timeout) {
  let timer = null;
  return function perform(...args) {
    if (timer) return

    timer = setTimeout( () => {
      func(...args);
      clearTimeout(timer);
      timer = null;
    }, timeout)
  }
}

// throttle toaster script

function throttleToaster (func, delay) {
  let lastExecutionTime = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastExecutionTime > delay) {
      func.apply(this, args);
      lastExecutionTime = now;
    }
  };
}

// fixed nav script

const nav = $('#navigation');
let tempScrollTop = $(window).scrollTop();
let isMenuOpen = false;

let isBurgerOpen, isBagOpen = false;


const navSlided = 'navigation-wrapper--slided';
const  navFixed = 'navigation-wrapper--fixed';

function fixedNavigation () {

  if (isMenuOpen || isBagOpen || isBurgerOpen) return; 
  

  let currentScrollTop = $(window).scrollTop();
  if (currentScrollTop > nav.height()) {
    nav.addClass(navFixed);
    if ( tempScrollTop > currentScrollTop ) {
      nav.addClass(navSlided);
    } else {
    nav.removeClass(navSlided);
    }
  } else {
    nav.removeClass(navFixed);
    nav.removeClass(navSlided);
  }
  tempScrollTop = currentScrollTop;
  };

  let throttledfixedNavigation = throttle(fixedNavigation, 200);
  $(window).scroll(throttledfixedNavigation);


// burger-menu
const burgers = $('.burger-line');

const $bag = $('#cart__img');
const $bagList = $('#cart-list');

$('#burger-menu').on('click', () => {

  isMenuOpen = !isMenuOpen; 

  if (isMenuOpen) {
    $('#header-list').addClass('header-list--burger-open');
    $('#nav-list').removeClass('header-nav--hidden');
    $('body').css('overflow', 'hidden');
    $bagList.removeClass('cart-open');
  } else {
    $('#header-list').removeClass('header-list--burger-open');
    $('#nav-list').addClass('header-nav--hidden');
    $('body').css('overflow', 'auto'); 
  }

burgers.each (() => {
  if (isMenuOpen) {
    burgers.addClass('burger-line--opened');
  } else {
    burgers.removeClass('burger-line--opened');
  }
})

$('.header__link-inner-link').on('click', () => {
  if (isMenuOpen) {
    closeBurger();
    isMenuOpen = !isMenuOpen;
  }
}); 
})

function closeBurger() {
  $('#header-list').removeClass('header-list--burger-open');
  $('#nav-list').addClass('header-nav--hidden');
  $('body').css('overflow', 'auto'); 
  burgers.removeClass('burger-line--opened');

}

// open bag

function openBag() {



  $bag.on('click', () => {

    
    isMenuOpen = !isMenuOpen;


    if (isMenuOpen) {
      $bagList.addClass('cart-open');
      if($(window).width() < 767) {
        console.log('width < 767');
        $('body').css('overflow', 'hidden');
          closeBurger()
      }
    } else {
      $bagList.removeClass('cart-open');
      $('body').css('overflow', 'auto');
    }
    
  })

}
openBag()



//carousel script

  const slider = $('#slider');

    slider.slick( {
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
       autoplaySpeed: 5000,
       pauseOnFocus: true,
       pauseOnDotsHover: true,
       pauseOnHover: true,
      arrows: false,
       easing: "ease-in",
       dots: true, 
       infinite: false,
       waitForAnimate: false,
       responsive:[
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
       ]
    })

  // filters script

const filterItems = $('.goods__filter-item');
let filtered = false;
const makeFiltered = (event, filterClass) => {
const target = $(event.target);
  
    if (target.hasClass("goods__filter-item--active")) {
      target.removeClass("goods__filter-item--active");
      slider.slick('goTo', 0);
      
      
      if (!target.hasClass("goods__filter-item--active")) {
        slider.slick('slickUnfilter');
      }
      return;
    }
  
    filterItems.not(target).removeClass("goods__filter-item--active");
    target.addClass("goods__filter-item--active");
    slider.slick('goTo', 0);
  
    if (filtered) {
      slider.slick('slickUnfilter');
    }
  
    slider.slick(`slickFilter`, `.${filterClass}`);
    filtered = true;
  }
  
$('#mix').on('click', (event) => makeFiltered(event, 'mix'));
$('#set').on('click', (event) => makeFiltered(event, 'set'));
$('#new').on('click', (event) => makeFiltered(event, 'new'));
$('#grains').on('click', (event) => makeFiltered(event, 'grains'));
$('#dry').on('click', (event) => makeFiltered(event, 'dry'));
$('#discount').on('click', (event) => makeFiltered(event, 'discount'));
$('#exotic').on('click', (event) => makeFiltered(event, 'exotic'));
$('#healthy').on('click', (event) => makeFiltered(event, 'healthy'));

// pressing shop button cancel active filters
$('#shop-now-button').on('click', () => {
  slider.slick('goTo', 0);
  slider.slick('slickUnfilter');
  filterItems.removeClass("goods__filter-item--active");
});

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
  isMenuOpen = true;
  nav.removeClass(navSlided);
  target.preventDefault();
  $('html, body').animate({
  scrollTop: elementToScroll.offset().top 
  }, 100)
  setTimeout(() => {
    isMenuOpen = false;
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



//) filter and bag-counter interaction  with enter key

$(document).on('keydown', (key) => {
  if (key.which === 13) {
    const focusedElement = document.activeElement;
    console.log(focusedElement);
    if ($(focusedElement).hasClass('goods__filter-item')) {
      $(focusedElement).trigger('click');
    }

    if ($(focusedElement).hasClass('goods-card')) {
      $(focusedElement).children().eq(1).children().eq(2).trigger('click')
    }
    
  }
})

// bag-counter limit toaster

const bagCounterToaster = $('#bag-counter-toaster')
bagCounterToaster.hide();

function bagCounterToasterMaximum () {
  bagCounterToaster.fadeIn(1000).delay(1000).addClass('toaster--slide-right');

  setTimeout(() => {
    bagCounterToaster.removeClass('toaster--slide-right');
  }, 3999)

  setTimeout(() => {
    bagCounterToaster.fadeOut(500)
  }, 4000)
}

const throttledBagCounterToasterMaximum = throttleToaster (bagCounterToasterMaximum, 4500);


// bag-counter 
function bagCounting () {

  const $headerCartCount = $('#cart__img-counter'),
        $totalSumma      = $('#cart-list__table-footer-price'),
        $totalQuantity   = $('#cart-list__table-footer-quantity');


  let itemCount      = 0,
      summa          = 0;
    
 
  let $counterInput, 
      $product,
      $id,
      $name,
      $cost;
   
    $('.goods-card__info').on('click', function(event) {
      $counterInput = $(this).find('input'),
      $product = $(this).closest('.goods-card');
      $id = parseInt($product.attr('data-product-id'));
      $name = $product.attr('data-product-name');
      $cost = parseInt($product.attr('data-product-cost'));
  });

  $(document).on('click', '.add-to-bag', function() {
      addToBag($counterInput);
  });

  $(document).on('click', '.bag-counter__plus', function() {
      counterPlus($counterInput);
  });

  $(document).on('click', '.bag-counter__minus', function() {
      counterMinus($counterInput);
  });


  // change "add to bag" with "plus" and "minus"
  function updateAddToBagVisibility(input) {

    const $addToBag = input.parents('.goods-card__info').find('.add-to-bag');

    if (input.val() > 0) {
      $addToBag.css('display', 'none');
      $addToBag.siblings('.bag-counter-container').css('display', 'flex'); 
      
    } else {
      $addToBag.css('display', 'block');
      $addToBag.siblings('.bag-counter-container').css('display', 'none'); 
    }
  }

  function addToBag(input) {

    if(counterLimit()) {
      return
    }

    if (input.val() === "0" || input.val() === " ") {
      input.val(parseInt(input.val()) + 1);
      itemCount += 1;
      fillingCart(input);
      $headerCartCount.text(itemCount);
      console.log(cartItems)
    }
    updateAddToBagVisibility(input);
    nav.addClass(navSlided);
  }
 
  function counterPlus(input) {

    if(counterLimit()) {
      return
    }

    if (input.val() < 10) {
      input.val(parseInt(input.val()) + 1);
      itemCount += 1;
      $headerCartCount.text(itemCount);
      fillingCart(input);
      console.log(cartItems)
    }
    updateAddToBagVisibility(input);
    nav.addClass(navSlided);
  }
  function counterMinus(input) {

    if (input.val() > 0) {
      input.val(parseInt(input.val()) - 1);
      itemCount -= 1;
      $headerCartCount.text(itemCount);
      removeFromCart(input);
      console.log(cartItems)
    }

    if (itemCount <= 0) {
      $headerCartCount.text("")
    }

    updateAddToBagVisibility(input);
    nav.addClass(navSlided);
  }
  
  // bag limit
  function counterLimit () {
    if (itemCount >= 15) {
      throttledBagCounterToasterMaximum();
      return true
    }
    return false
  }

  function fillingCart(input) {
    if (!cartItems[$id]) {
      cartItems[$id] = { id: $id, name: $name,  quantity: parseInt(input.val()), cost: $cost };

      summa = summa + $cost;
      $totalSumma.text(`${summa} $`);
      $totalQuantity.text(`${itemCount / 10} kg.`);


      console.log(cartItems)
    } else {
      cartItems[$id].quantity += 1;
      cartItems[$id].cost += $cost;

      summa = summa + $cost;
      $totalSumma.text(`${summa} $`);
      $totalQuantity.text(`${itemCount / 10} kg.`);


    }
    createCard()
  }


  function removeFromCart() {
    if (!cartItems[$id]) {
      return false
    } else {
      cartItems[$id].quantity -= 1;
      cartItems[$id].cost -= $cost;

      summa = summa - $cost;
      $totalSumma.text(`${summa} $`);
      $totalQuantity.text(`${itemCount / 10} kg.`);

      if (cartItems[$id].quantity === 0) {
        delete cartItems[$id];
      }
    }
    createCard()
  }

 
  function createCard() {
    if (Object.keys(cartItems).length === 0) {
      $('#card-list__goods').empty();
      $('#empty-cart').css('display', 'block');
      $('#cart-list__goods-container').css('display', 'none');
    } else {
      $('#empty-cart').css('display', 'none');
      $('#cart-list__goods-container').css('display', 'block');
      $('#card-list__goods').empty();
      $('#card-list__goods').append( `
          ${Object.keys(cartItems).map( key => {
            return `
                <tr class="cart-list__table-row" >
                <td>${cartItems[key].name}</td>
                <td>${cartItems[key].quantity * 100} g.</td>
                <td>${cartItems[key].cost}$</td>
                </tr>
            `
          }).join('')}
        `)
    }
  }

  $('#clear-cart-button').click(() => {
    clearCart();
  })

  function clearCart() {
    cartItems = {};
    itemCount = 0;
    summa = 0;
    $totalSumma.text(`${summa} $`);
    $totalQuantity.text(`${itemCount / 10} kg.`);
    $headerCartCount.text("");
    createCard();
    $('.bag-counter__count').each(function() {
      $(this).val("0");
      updateAddToBagVisibility($(this));
    });

    
  }


}
bagCounting();



// click on contact-header refer you to first name input
$('#contact-header').click(() => {
  $('#contact-form-first-name').trigger('focus');
})


})(jQuery);


export {cartItems}