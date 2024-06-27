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
    })
})(jQuery);

let filtered = false;
let filterItems = $('.goods-filter-item');

let makeFilteredDry = (event) => {
    if (filtered === false) {

        $('.slider').slick('slickFilter', '.dry');
        filtered = true;
        } else {
            $('.slider').slick('slickUnfilter');
            filtered = false;
        }

        const target = $(event.target); 

        if (target.hasClass("goods-filter-item-active")) {
            target.removeClass("goods-filter-item-active");
            return; 
        }

        filterItems.not(target).removeClass("goods-filter-item-active");
        target.addClass("goods-filter-item-active");
}

$('#dry').on('click', makeFilteredDry);




let makeFilteredExotic = (event) => {

    if (filtered === false) {
                $('.slider').slick('slickFilter', '.exotic');
                filtered = true;
            } else {
                $('.slider').slick('slickUnfilter');
                filtered = false;
            }

           
        const target = $(event.target); 

        if (target.hasClass("goods-filter-item-active")) {
            target.removeClass("goods-filter-item-active");
            return; 
        }

        filterItems.not(target).removeClass("goods-filter-item-active");
        target.addClass("goods-filter-item-active"); 
}

$('#exotic').on('click', makeFilteredExotic);


let makeFilteredMix = (event) => {

    if (filtered === false) {
        $('.slider').slick('slickFilter', '.mix');
        filtered = true;
    } else {
        $('.slider').slick('slickUnfilter');
        filtered = false;
    }
}

$('#mix').on('click', makeFilteredMix);


let makeFilteredSet = (event) => {

    if (filtered === false) {
        $('.slider').slick('slickFilter', '.set');
        filtered = true;
    } else {
        $('.slider').slick('slickUnfilter');
        filtered = false;
    }
}

$('#set').on('click', makeFilteredSet);

let makeFilteredNew = (event) => {

    if (filtered === false) {
        $('.slider').slick('slickFilter', '.new');
        filtered = true;
    } else {
        $('.slider').slick('slickUnfilter');
        filtered = false;
    }
}

$('#new').on('click', makeFilteredNew);

let makeFilteredGrains = (event) => {

    if (filtered === false) {
        $('.slider').slick('slickFilter', '.grains');
        filtered = true;
    } else {
        $('.slider').slick('slickUnfilter');
        filtered = false;
    }
}

$('#grains').on('click', makeFilteredGrains);

let makeFilteredDiscount = (event) => {

    if (filtered === false) {
        $('.slider').slick('slickFilter', '.discount');
        filtered = true;
    } else {
        $('.slider').slick('slickUnfilter');
        filtered = false;
    }
}

$('#discount').on('click', makeFilteredDiscount);

let makeFilteredHealthy = (event) => {

    if (filtered === false) {
        $('.slider').slick('slickFilter', '.healthy');
        filtered = true;
    } else {
        $('.slider').slick('slickUnfilter');
        filtered = false;
    }
}

$('#healthy').on('click', makeFilteredHealthy);



