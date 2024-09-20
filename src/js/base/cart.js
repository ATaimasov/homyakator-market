import { fancyHtml, fancyText } from '../libs/fancybox.js';


export const cartMenu = () => {
    const cart = $('#cart');

    $(cart).on('click', (event) => {
        fancyHtml(fancyText.cart);
    })
}

