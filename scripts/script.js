;(function ($, undefined) {
    $('.slider').slick( {
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
const slider = $('.slider');
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

// try-new script

$('#try-cornucopia-crunch').click(() => {
  slider.slick('goTo', 8);
  MakeHighlighted('#cornucopia-crunch-bag')
}
);

$('#try-hamster-harvest').click(() => {
  slider.slick('goTo', 14);
  MakeHighlighted('#hamster-harvest-bag');
}
);

$('#try-paws-crisps').click(() => {
  slider.slick('goTo', 17);
  MakeHighlighted('#Paws-Crips-bag');
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

const MakeHighlighted = (GoodTitle) => {
  if (!$(GoodTitle).hasClass('goods-card__info-bag--script-highlighted')) {
  $(GoodTitle).addClass('goods-card__info-bag--script-highlighted');
  setTimeout( () => {
  $(GoodTitle).removeClass('goods-card__info-bag--script-highlighted');
  }, 3000)
  }
}


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

// not work
// const ScrollToGoods = (filterClass, filterIDs) => {
//   const filterID = $(`${filterIDs}`);
//   const filterClasses = $(`${filterClass}`);

//   $('.slider').slick('slickUnfilter');
//   $('.slider').slick(`slickFilter`, filterClasses);
//   $('.slider').slick('goTo', 0);

//   filterItems.not(filterID).removeClass("goods__filter-item--active");
//   filterID.addClass("goods__filter-item--active");
// };

// $('#shop-exotic').on('click', () => ScrollToGoods ('.exotic', '#exotic'));
// $('#shop-healthy').on('click', () => ScrollToGoods ('.healthy', '#healthy'));
// $('#try-hamster-harvest').on('click', () => ScrollToGoods ('.new', '#new'));
// $('#try-cornucopia-crunch').on('click', () => ScrollToGoods ('.new', '#new'));
// $('#try-paws-crisps').on('click', () => ScrollToGoods ('.new', '#new'));

})(jQuery);



