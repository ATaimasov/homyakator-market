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

export {slider}