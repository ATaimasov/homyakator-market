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

// filter interaction with enter keyboard script

$(document).on('keydown', (key) => {
  if (key.which === 13) {
    const focusedElement = document.activeElement;
    console.log(focusedElement);
    if ($(focusedElement).hasClass('goods__filter-item')) {
      $(focusedElement).trigger('click');
    }
  }
})


// bag-counter 
function bagCounting () {

  let currentCount = parseInt($('#header__cart-count').text());
  let headerCartCount = $('#header__cart-count');
  
  function updateAddToBagVisibility(element) {
  
    if (currentCount > 0) {
      element.css('display', 'none');
      element.siblings('.bag-counter-container').css('display', 'flex'); 
    } else {
      element.css('display', 'block');
      element.siblings('.bag-counter-container').css('display', 'none'); 
    }
  }
  
  $('.add-to-bag').click(function () {
  
    let counterInput = $(this).parent().children().find('input');
  
  
    if (currentCount === 0 && counterInput.val(0)) {
      counterInput.val(parseInt(counterInput.val()) + 1);
      currentCount++;
      headerCartCount.text(currentCount);
    }
    updateAddToBagVisibility($(this));
    nav.addClass(navSlided);
  })
  
  $('.bag-counter__minus').click(function () {
    
    if (currentCount > 0 ) {
     
      var counterInput = $(this).parent().find('input');
      var count = parseInt(counterInput.val()) - 1;
      counterInput.val(count);
  
      currentCount--;
      headerCartCount.text(currentCount);
  
    }
    updateAddToBagVisibility($(this).parent().parent().children().eq(2));
    nav.addClass(navSlided);
  })
  
  $('.bag-counter__plus').click(function () {
  
     var counterInput = $(this).parent().find('input');
     counterInput.val(parseInt(counterInput.val()) + 1)
  
    if (currentCount < 100) {
      currentCount++;
      headerCartCount.text(currentCount);
  
    }
    updateAddToBagVisibility($(this).parent().parent().children().eq(2));
    nav.addClass(navSlided);
  });

}

bagCounting();




// toaster script
const toaster = $('#contact-form-toaster');
toaster.hide();

$('#contact-form').submit((event) => {
  event.preventDefault();
  
  $('#contact-button').prop('disabled', true);

  toaster.fadeIn(1000).delay(1000).addClass('contact-form-toaster--slide-right');

  setTimeout(() => {
      toaster.removeClass('contact-form-toaster--slide-right');
  }, 3999)

  setTimeout(() => {
    toaster.fadeOut(500)
  }, 4000)
  
  setTimeout(() => {
    $('#contact-button').prop('disabled', false);
  }, 5000)

})

$('#contact-header').click(() => {
  $('#contact-form-first-name').trigger('focus');
})

})(jQuery);



