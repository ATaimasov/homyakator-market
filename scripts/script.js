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

function fixedNavigation () {
    console.log(1)
    let currentScrollTop = $(window).scrollTop();
    if (currentScrollTop > nav.height()) {
      nav.addClass('navigation-wrapper--fixed');
      if ( tempScrollTop > currentScrollTop ) {
        nav.addClass('navigation-wrapper--slided');
      } else {
      nav.removeClass('navigation-wrapper--slided');
      }
    } else {
      nav.removeClass('navigation-wrapper--fixed');
      nav.removeClass('navigation-wrapper--slided');
    }
    tempScrollTop = currentScrollTop;
    };

let throttledfixedNavigation = throttle(fixedNavigation, 200);
$(window).scroll(throttledfixedNavigation);

// burger-menu




function resizeBurgerMenu () {
  if (window.innerWidth <= 767) {
    $('#nav-list').addClass('hidden');
    nav.css('justify-content', 'flex-end');
  } else {
    $('#nav-list').removeClass('hidden');
    nav.css('justify-content', 'center');
  }
}

resizeBurgerMenu();

let throttledMakeBurgerMenu = throttle(resizeBurgerMenu, 250);


$(window).on('resize', throttledMakeBurgerMenu);

let burgers = $('.burger-line');

$('#burger-menu').on('click', () => {
    burgers.each (() => {
      if (!burgers.hasClass('burger-line--opened')) {
        burgers.addClass('burger-line--opened');
      } else {
        burgers.removeClass('burger-line--opened');
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
    console.log(focusedElement)
    if ($(focusedElement).hasClass('goods__filter-item')) {
      $(focusedElement).trigger('click');
    }
  }
})

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



