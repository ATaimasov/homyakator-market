import { fancyHtml, fancyText } from '../libs/popUpText.js';


export const cartMenu = () => {
    const cart = $('#cart');

    $(cart).on('click', (event) => {
        fancyHtml(fancyText.cart);
    })
}

