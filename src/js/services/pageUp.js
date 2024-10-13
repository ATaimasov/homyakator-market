import { throttle } from "../utils/throttle.js";

$('#page-up').on('click',((e) => {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 300);
})
)

function pageUp() {
    if ($(window).scrollTop() > 1600 && $(window).width() > 1400) {
        $('#page-up').fadeIn();
      } else {
        $('#page-up').fadeOut();
      }
}

const throttledPageUp = throttle(pageUp, 200);
$(window).on('scroll', throttledPageUp);