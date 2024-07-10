;(function ($, undefined) {


// throttle script

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

// debounce script



// fixed nav script

const nav = $('#navigation');
let tempScrollTop = $(window).scrollTop();
let isMenuOpen = false;
navSlided = 'navigation-wrapper--slided';
  navFixed = 'navigation-wrapper--fixed';

function fixedNavigation () {

  if (isMenuOpen) return; 
  

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

$('#burger-menu').on('click', () => {

  isMenuOpen = !isMenuOpen; 

  if (isMenuOpen) {
    $('#header-list').addClass('header-list--burger-open');
    $('#nav-list').removeClass('header-nav--hidden');
    $('body').css('overflow', 'hidden');
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
    $('#header-list').removeClass('header-list--burger-open');
    $('#nav-list').addClass('header-nav--hidden');
    $('body').css('overflow', 'auto'); 
    burgers.removeClass('burger-line--opened');
    isMenuOpen = !isMenuOpen;
  }
}); 
})

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

$('#try-cornucopia-crunch').click(() => {
  MakeHighlighted('#cornucopia-crunch-bag');
  slider.slick('goTo', 8);
}
);

$('#try-hamster-harvest').click(() => {
  MakeHighlighted('#hamster-harvest-bag');
  slider.slick('goTo', 14);
}
);

$('#try-paws-crisps').click(() => {
  MakeHighlighted('#Paws-Crips-bag');
  slider.slick('goTo', 17);
}
);

$('#shop-healthy').click(()=> {
  MakeHighlighted('#healthy');
})

$('#shop-exotic').click(()=> {
  MakeHighlighted('#exotic');
})

$('#contact-link').click(()=> {
  MakeHighlighted('#contact-header');
})

// filter and bag-counter interaction  with enter key

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

let throttledbagCounterToasterMaximum = throttle(bagCounterToasterMaximum, 200);

// bag-counter 

function bagCounting () {

  let headerCartCount = $('#header__cart-count');
  
  let itemCount = 0;

  
  function updateAddToBagVisibility(element) {

    let counterInput = element.siblings('.bag-counter-container').find('input').val();

    if (counterInput > 0) {
      element.css('display', 'none');
      element.siblings('.bag-counter-container').css('display', 'flex'); 
      
    } else {
      element.css('display', 'block');
      element.siblings('.bag-counter-container').css('display', 'none'); 
      
    }
  }
  
  $('.add-to-bag').click(function () {
  
    let counterInput = $(this).parent().children().find('input');

    if (counterInput.val() === "0" || counterInput.val() === " ") {

      if (headerCartCount.text() >= 100) {
        throttledbagCounterToasterMaximum();
        return
      }
      counterInput.val(parseInt(counterInput.val()) + 1);
      itemCount += 1;
      headerCartCount.text(itemCount);
    }
    updateAddToBagVisibility($(this));
    nav.addClass(navSlided);
    console.log(itemCount + ' item count')
    console.log(counterInput.val() + " value")
  })
  
  $('.bag-counter__minus').click(function () {
    
    let counterInput = $(this).parent().find('input');
    if (counterInput.val() > 0 ) {
     
      let count = parseInt(counterInput.val()) - 1;
      counterInput.val(count);
      itemCount -= 1;
      headerCartCount.text(itemCount);

    }
    updateAddToBagVisibility($(this).parent().siblings('.add-to-bag'));
    nav.addClass(navSlided);
    console.log(itemCount + ' item count')
  })
  
  $('.bag-counter__plus').click(function () {

    // const id = $(this).closest('.goods-card').attr('data-product-id');
    // const currentValue = parseInt($(this).siblings('input').value);

    // console.log(currentValue)

    // if (!inputStates[id]) {
    //   inputStates[id] = { previousInputCount: 0, currentInputCount: 0 };
    // }
  
    // inputStates[id].previousInputCount = inputStates[id].currentInputCount; // currentValue before change
    // inputStates[id].currentInputCount = currentValue; // currentValue after change
  

     let counterInput = $(this).siblings('input');

  
    //  if (inputStates[id].currentInputCount > inputStates[id].previousInputCount) {
    //   itemCount += 1;
    // }
     
    if (counterInput.val() < 10) {

      if (headerCartCount.text() >= 100) {
        throttledbagCounterToasterMaximum()
        return
      }

      counterInput.val(parseInt(counterInput.val()) + 1)
      itemCount += 1;
      headerCartCount.text(itemCount);
  
    }
    updateAddToBagVisibility($(this).parent().siblings('.add-to-bag'));
    nav.addClass(navSlided);
    console.log(itemCount + ' item count')
  });

  let inputStates = {};

  $('.bag-counter__count').on('input', function () {
    const id = $(this).closest('.goods-card').attr('data-product-id');
    const currentValue = parseInt(this.value);

    // Initialize the state for a new item if it does not already exist
    if (!inputStates[id]) {
      inputStates[id] = { previousInputCount: 0, currentInputCount: 0 };
    }
  
    // values updates. currentValue declared above
    inputStates[id].previousInputCount = inputStates[id].currentInputCount; // currentValue before change
    inputStates[id].currentInputCount = currentValue; // currentValue after change
  
    // itemCount update
    if (inputStates[id].currentInputCount > inputStates[id].previousInputCount) {
      itemCount += 1;
    } else if (((inputStates[id].currentInputCount < inputStates[id].previousInputCount) && itemCount > 0) || ((inputStates[id].previousInputCount === 0) && itemCount > 0)) {
      itemCount -= 1;
    }

    if (itemCount > 100) {
      itemCount = 100;
      throttledbagCounterToasterMaximum()
      // блокировка input
    }
  
    console.log(itemCount + ' item count');
    console.log(inputStates[id].previousInputCount + ' prev');
    console.log(inputStates[id].currentInputCount + ' curr');
  
    let value = this.value.replace(/[^0-9]/g, '');
        if (value < $(this).data('min')) {
          this.value = $(this).data('min');
        } else if (value > $(this).data('max')) {
          this.value = $(this).data('max');
        } else {
          this.value = value;
        }
        
        headerCartCount.text(itemCount);
        nav.addClass(navSlided);
        updateAddToBagVisibility($(this).parent().siblings('.add-to-bag'));
    
       
  });


}
bagCounting();









// contact-form toaster script
const contactToaster = $('#contact-form-toaster');
contactToaster.hide();

$('#contact-form').submit((event) => {
  event.preventDefault();
  
  $('#contact-button').prop('disabled', true);

  contactToaster.fadeIn(1000).delay(1000).addClass('toaster--slide-right');

  setTimeout(() => {
    contactToaster.removeClass('toaster--slide-right');
  }, 3999)

  setTimeout(() => {
    contactToaster.fadeOut(500)
  }, 4000)
  
  setTimeout(() => {
    $('#contact-button').prop('disabled', false);
  }, 5000)

})

$('#contact-header').click(() => {
  $('#contact-form-first-name').trigger('focus');
})

})(jQuery);



