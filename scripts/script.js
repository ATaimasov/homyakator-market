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
    })
})(jQuery);

let filterItems = $('.goods-filter-item');
let filtered = false;


let makeFiltered = (event) => {
    filterItems.removeClass("goods-filter-item-active");
    $(event.target).addClass("goods-filter-item-active");

 
    if (filtered === false) {
        $('.slider').slick('slickFilter','.dry');
        filtered = true;
    } else {
        $('.slider').slick('slickUnfilter');
        filtered = false;
    }
};

filterItems.on('click', makeFiltered);






