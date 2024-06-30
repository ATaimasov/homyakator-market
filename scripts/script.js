;(function ($, undefined) {
    $('.slider').slick( {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
       autoplaySpeed: 5000,
       pauseOnFocus: true,
       pauseOnDotsHover: true,
       pauseOnHover: true,
       arrows: true,
       easing: "ease-in",
       dots: true, 
       variableWidth: true,
       infinite: false,
    })
})(jQuery);

let filtered = false;
let filterItems = $('.goods-filter-item');

const makeFiltered = (event, filterClass) => {
    const target = $(event.target);
  
    if (target.hasClass("goods-filter-item-active")) {
      target.removeClass("goods-filter-item-active");
      if (!filterItems.hasClass("goods-filter-item-active")) {
        $('.slider').slick('slickUnfilter');
        filtered = false;
      }
      return;
    }
  
    filterItems.not(target).removeClass("goods-filter-item-active");
    target.addClass("goods-filter-item-active");
  
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


// let makeFilteredDry = (event) => {
//     if (filtered === false) {

//         $('.slider').slick('slickFilter', '.dry');
//         filtered = true;
//         } else {
//             $('.slider').slick('slickUnfilter');
//             filtered = false;
//         }

//         const target = $(event.target); 

//         if (target.hasClass("goods-filter-item-active")) {
//             target.removeClass("goods-filter-item-active");
//             return; 
//         }

//         filterItems.not(target).removeClass("goods-filter-item-active");
//         target.addClass("goods-filter-item-active");
// }

// $('#dry').on('click', makeFilteredDry);




// let makeFilteredExotic = (event) => {

//     if (filtered === false) {
//                 $('.slider').slick('slickFilter', '.exotic');
//                 filtered = true;
//             } else {
//                 $('.slider').slick('slickUnfilter');
//                 filtered = false;
//             }

           
//         const target = $(event.target); 

//         if (target.hasClass("goods-filter-item-active")) {
//             target.removeClass("goods-filter-item-active");
//             return; 
//         }

//         filterItems.not(target).removeClass("goods-filter-item-active");
//         target.addClass("goods-filter-item-active"); 
// }

// $('#exotic').on('click', makeFilteredExotic);


// let makeFilteredMix = (event) => {

//     if (filtered === false) {
//         $('.slider').slick('slickFilter', '.mix');
//         filtered = true;
//     } else {
//         $('.slider').slick('slickUnfilter');
//         filtered = false;
//     }

   
// const target = $(event.target); 

// if (target.hasClass("goods-filter-item-active")) {
//     target.removeClass("goods-filter-item-active");
//     return; 
// }

// filterItems.not(target).removeClass("goods-filter-item-active");
// target.addClass("goods-filter-item-active"); 

// }

// $('#mix').on('click', makeFilteredMix);


// let makeFilteredSet = (event) => {

//     if (filtered === false) {
//         $('.slider').slick('slickFilter', '.set');
//         filtered = true;
//     } else {
//         $('.slider').slick('slickUnfilter');
//         filtered = false;
//     }

   
// const target = $(event.target); 

// if (target.hasClass("goods-filter-item-active")) {
//     target.removeClass("goods-filter-item-active");
//     return; 
// }

// filterItems.not(target).removeClass("goods-filter-item-active");
// target.addClass("goods-filter-item-active"); 

// }

// $('#set').on('click', makeFilteredSet);

// let makeFilteredNew = (event) => {

//     if (filtered === false) {
//         $('.slider').slick('slickFilter', '.new');
//         filtered = true;
//     } else {
//         $('.slider').slick('slickUnfilter');
//         filtered = false;
//     }

   
// const target = $(event.target); 

// if (target.hasClass("goods-filter-item-active")) {
//     target.removeClass("goods-filter-item-active");
//     return; 
// }

// filterItems.not(target).removeClass("goods-filter-item-active");
// target.addClass("goods-filter-item-active"); 

// }

// $('#new').on('click', makeFilteredNew);

// let makeFilteredGrains = (event) => {

//     if (filtered === false) {
//         $('.slider').slick('slickFilter', '.grains');
//         filtered = true;
//     } else {
//         $('.slider').slick('slickUnfilter');
//         filtered = false;
//     }

   
// const target = $(event.target); 

// if (target.hasClass("goods-filter-item-active")) {
//     target.removeClass("goods-filter-item-active");
//     return; 
// }

// filterItems.not(target).removeClass("goods-filter-item-active");
// target.addClass("goods-filter-item-active"); 

// }

// $('#grains').on('click', makeFilteredGrains);


// let makeFilteredDiscount = (event) => {

//     if (filtered === false) {
//         $('.slider').slick('slickFilter', '.discount');
//         filtered = true;
//     } else {
//         $('.slider').slick('slickUnfilter');
//         filtered = false;
//     }

   
// const target = $(event.target); 

// if (target.hasClass("goods-filter-item-active")) {
//     target.removeClass("goods-filter-item-active");
//     return; 
// }

// filterItems.not(target).removeClass("goods-filter-item-active");
// target.addClass("goods-filter-item-active"); 

// }

// $('#discount').on('click', makeFilteredDiscount);


// let makeFilteredHealthy = (event) => {

//     if (filtered === false) {
//         $('.slider').slick('slickFilter', '.healthy');
//         filtered = true;
//     } else {
//         $('.slider').slick('slickUnfilter');
//         filtered = false;
//     }

   
// const target = $(event.target); 

// if (target.hasClass("goods-filter-item-active")) {
//     target.removeClass("goods-filter-item-active");
//     return; 
// }

// filterItems.not(target).removeClass("goods-filter-item-active");
// target.addClass("goods-filter-item-active"); 

// }

// $('#healthy').on('click', makeFilteredHealthy);



