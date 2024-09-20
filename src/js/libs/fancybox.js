import { Fancybox } from "@fancyapps/ui";

export const fancyText = {
  successSend   : `<p class="popup-text">Data sent successfully</p>`,
  requiredFields: `<p class="popup-text">Fill in the mandatory fields</p>`,
  errorSend     : `
  <div style="display: grid; justify-items: center; gap: 10%">
  <img src="/img/header__cart-bag-toaster-image.png" alt="sad hamster" style="max-width:50%" class="toaser__image header__cart-bag-toaster-image">
  <p class="popup-text" style="font-size: 150%">An error occurred</>
  </div>
  `,
  cart: `
  <div class="cart-list__goods-container" id="cart-list__goods-container">
                <table id="cart-list__table" class="cart-list__table">
                    <thead>
                    <tr class="cart-list__table-row">
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody id="card-list__goods">
                    
                </tbody>
                <tfoot id="cart-list__table-footer">
                    <tr>
                        <td>Total</td>
                        <td id="cart-list__table-footer-quantity">0 g.</td>
                        <td id="cart-list__table-footer-price">0$</td>
                    </tr>
                </tfoot>
                </table>
                <div class="cart-button-container">   
                    <button class="cart-button cart-button__text" id="cart-button">Checkout</button>
                    <button class="cart-button cart-button__text" id="clear-cart-button">Clear cart</button>
                </div>
            </div>
  `
  // policy text in the policy.js
}

  export function fancyHtml(text) {
    Fancybox.show(
      [
        {
          src: text,
          type: 'html',
        },
      ],
    );
  }
