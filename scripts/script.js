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
       responsive:[
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
          {  breakpoint: 820,
          settings: {
            slidesToShow: 1,
            // slidesToScroll: 1
            // лупит бесконечно. попробовать убрать блокировку прокрутки
         } 
        }
        
       ]
    })



   

let filtered = false;
let filterItems = $('.goods__filter-item');

const makeFiltered = (event, filterClass) => {
    const target = $(event.target);
  
    if (target.hasClass("goods__filter-item--active")) {
      target.removeClass("goods__filter-item--active");
      if (!target.hasClass("goods__filter-item--active")) {
        $('.slider').slick('slickUnfilter');
      }
      return;
    }
  
    filterItems.not(target).removeClass("goods__filter-item--active");
    target.addClass("goods__filter-item--active");
  
    if (filtered) {
      $('.slider').slick('slickUnfilter');
    }
  
    $('.slider').slick(`slickFilter`, `.${filterClass}`);
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

})(jQuery);



