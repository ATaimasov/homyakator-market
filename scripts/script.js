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

// bag-counter 
function bagCounting () {

  let headerCartCount = $('#header__cart-count');
  let totalItemCount  = parseInt(headerCartCount.text());
  
  function updateAddToBagVisibility(element) {

    let counterInput = element.parent().children().find('input').val();

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

    if (counterInput.val() === "0") {

      if (headerCartCount.text() >= 100) {
        alert ('you are reach the max number');
        return
      }
      counterInput.val(parseInt(counterInput.val()) + 1);
      totalItemCount += 1;
      headerCartCount.text(totalItemCount);
    }
    updateAddToBagVisibility($(this));
    nav.addClass(navSlided);
    
  })
  
  $('.bag-counter__minus').click(function () {
    
    let counterInput = $(this).parent().find('input');
    if (counterInput.val() > 0 ) {
     
      let count = parseInt(counterInput.val()) - 1;
      counterInput.val(count);
      totalItemCount -= 1;
      headerCartCount.text(totalItemCount);

    }
    updateAddToBagVisibility($(this).parent().parent().children().eq(1));
    nav.addClass(navSlided);
    
  })
  
  $('.bag-counter__plus').click(function () {
  
     let counterInput = $(this).parent().find('input');
     
    if (counterInput.val() < 10) {

      if (headerCartCount.text() >= 100) {
        alert ('you are reach the max number');
        return
      }

      counterInput.val(parseInt(counterInput.val()) + 1)
      totalItemCount += 1;
      headerCartCount.text(totalItemCount);
  
    }
    updateAddToBagVisibility($(this).parent().parent().children().eq(1));
    nav.addClass(navSlided);
    
  });


  let previousInputs = [];
  let currentInputs = [];
  let itemCount = totalItemCount;



  for (let i = 0; i < $('.bag-counter__count').length; i++) {
    previousInputs[i] = 1;
    currentInputs[i] = 1;
}


$('.bag-counter__count').on('input', function () {
  let index = $('.bag-counter__count').index(this); // Получаем индекс текущего поля ввода

  // Обновляем текущее значение для данного поля
  currentInputs[index] = parseInt(this.value);

  // Суммируем изменения во всех полях
  for (let i = 0; i < currentInputs.length; i++) {
      if (currentInputs[i] !== previousInputs[i]) {
          itemCount += (currentInputs[i] > previousInputs[i] ? 1 : -1);
      }
  }

  console.log(itemCount + ' item count');
  console.log(currentInputs.join(' ') + ' curr');
  console.log(previousInputs.join(' ') + ' prev');

  // Обновляем предыдущие значения для следующего цикла
  previousInputs = [...currentInputs];

  // Ваша логика валидации и обновления UI...
  if (itemCount !== totalItemCount) {
    totalItemCount = itemCount;
    headerCartCount.text(totalItemCount);
  }

  // Пример обновления текста в headerCartCount
  headerCartCount.text(itemCount);
  nav.addClass(navSlided);
  updateAddToBagVisibility($(this).parent().parent().children().eq(1));
});


}
bagCounting();

//   let previousInputCount = 1;
//   let currentInputCount = 1;
//   let itemCount = 1;

//   $('.bag-counter__count').on('input', function () {

//     if (itemCount >= 100) return;

//     currentValue = parseInt(this.value);
    
//     if (!previousInputCount) {
//       previousInputCount = currentValue;
//     }
    
//     currentInputCount = currentValue;

//  if (currentValue > previousInputCount) {
//   itemCount += 1;
//  } else if (currentValue < previousInputCount && itemCount > 0) {
//   itemCount -= 1;
//  }

  
//   console.log(itemCount + ' item count')
//     console.log(previousInputCount + ' prev')
//     console.log(currentInputCount + ' curr')

    

//     let value = this.value.replace(/[^0-9]/g, '');
//     if (value < $(this).data('min')) {
//       this.value = $(this).data('min');
//     } else if (value > $(this).data('max')) {
//       this.value = $(this).data('max');
//     } else {
//       this.value = value;
//     }
    
//     headerCartCount.text(itemCount);
//     nav.addClass(navSlided);
    
//     // console.log(totalItemCount +' totalitem count')
//     // console.log(headerCartCount.text() + " header count")
//     updateAddToBagVisibility($(this).parent().parent().children().eq(1));

//     previousInputCount = currentInputCount;
// })









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



