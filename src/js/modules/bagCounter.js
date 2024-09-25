
// bag-counter limit toaster

import { throttleToaster } from "../utils/throttle.js";
import { $nav, $navAppearing, navState } from "../services/fixedNavigation.js";


const bagCounterToaster = $('#bag-counter-toaster')
bagCounterToaster.hide();

function bagCounterToasterMaximum () {
  bagCounterToaster.fadeIn(1000).delay(1000).addClass('toaster--slide-right');

  setTimeout(() => {
    bagCounterToaster.removeClass('toaster--slide-right');
  }, 3999)

  setTimeout(() => {
    bagCounterToaster.fadeOut(500)
  }, 4000)
}

const throttledBagCounterToasterMaximum = throttleToaster (bagCounterToasterMaximum, 4500);



let cartItems = {};

// bag-counter 
function bagCounting () {

  const $headerCartCount = $('#cart__img-counter'),
        $totalSumma      = $('#cart-list__table-footer-price'),
        $totalQuantity   = $('#cart-list__table-footer-quantity');


  let itemCount = 0,
      summa     = 0;
    
 
  let $counterInput, 
      $product,
      $id,
      $name,
      $cost;
   
    $('.goods-card__info').on('click', function(event) {
      $counterInput = $(this).find('input'),
      $product      = $(this).closest('.goods-card');
      $id           = parseInt($product.attr('data-product-id'));
      $name         = $product.attr('data-product-name');
      $cost         = parseInt($product.attr('data-product-cost'));
  });

  $(document).on('click', '.add-to-bag', function() {
      addToBag($counterInput);
  });

  $(document).on('click', '.bag-counter__plus', function() {
      counterPlus($counterInput);
  });

  $(document).on('click', '.bag-counter__minus', function() {
      counterMinus($counterInput);
  });


  //* bag logic

  let isMinus, isPlus = false;

  // change "add to bag" with "plus" and "minus"
  function updateAddToBagVisibility(input) {

    const $addToBag = input.parents('.goods-card__info').find('.add-to-bag');

    if (input.val() > 0) {
      $addToBag.css('display', 'none');
      $addToBag.siblings('.bag-counter-container').css('display', 'flex'); 
      
    } else {
      $addToBag.css('display', 'block');
      $addToBag.siblings('.bag-counter-container').css('display', 'none'); 
    }
  }

  // includes showing value of each good and common counter in bag
  function updateCounter(input) {

    if(isPlus) {
      if ((input.val() === "0" || input.val() === " ") || (input.val() < 10)) {
        input.val(parseInt(input.val()) + 1);

        itemCount += 1;
        isPlus     = false;

        fillingBag(input);
 
      }
    }

    if(isMinus) {
     if (input.val() > 0) {
      input.val(parseInt(input.val()) - 1);

      itemCount -= 1;
      isMinus    = false;

      removeFromBag(input);
    }
  }

    $headerCartCount.text(itemCount);
    if($headerCartCount.text() >= 10) {
      $headerCartCount.css('inset', '28% 21%');
    } else {
      $headerCartCount.css('inset', '28% 30%');
    }


    updateAddToBagVisibility(input);
    $nav.addClass($navAppearing);

  }


  // first adding to bag
  function addToBag(input) {

    if(counterLimit()) {
      return
    }

    if($(window).width() > 1400) {
      if(!navState.isBagOpen) {
        $('#cart__img').trigger('click');
      }
    }

    isPlus = true;
    updateCounter(input)
  }

  // plus
  function counterPlus(input) {

    if(counterLimit()) {
      return
    }

    isPlus = true;
    updateCounter(input)


  }

  // minus
  function counterMinus(input) {

    isMinus = true;

    updateCounter(input)

    if (itemCount <= 0) {
      $headerCartCount.text("")
    }

  }

  // bag limit depending common count
  function counterLimit () {
    if (itemCount >= 15) {
      throttledBagCounterToasterMaximum();
      return true
    }
    return false
  }

  function fillingBag(input) {

    if (!cartItems[$id]) {
      cartItems[$id] = { id: $id, name: $name,  quantity: parseInt(input.val()), cost: $cost };
    } else {
      cartItems[$id].quantity += 1;
      cartItems[$id].cost     += $cost;
    }

    summa = summa + $cost;
    $totalSumma.text(`${summa} $`);
    $totalQuantity.text(`${itemCount / 10} kg.`);

    createCard()
  }


  function removeFromBag() {
    if (!cartItems[$id]) {
      return false
    } else {
      cartItems[$id].quantity -= 1;
      cartItems[$id].cost     -= $cost;

      summa = summa - $cost;
      $totalSumma.text(`${summa} $`);
      $totalQuantity.text(`${itemCount / 10} kg.`);

      if (cartItems[$id].quantity === 0) {
        delete cartItems[$id];
      }
    }
    createCard()
  }

  function createCard() {
    if (Object.keys(cartItems).length === 0) {
      $('#card-list__goods').empty();
      $('#cart__empty').css('display', 'block');
      $('#cart-list__goods-container').css('display', 'none');
    } else {
      $('#cart__empty').css('display', 'none');
      $('#cart-list__goods-container').css('display', 'block');
      $('#card-list__goods').empty();
      $('#card-list__goods').append( `
          ${Object.keys(cartItems).map( key => {
            return `
                <tr>
                <td>${cartItems[key].name}</td>
                <td>${cartItems[key].quantity * 100} g.</td>
                <td>${cartItems[key].cost}$</td>
                </tr>
            `
          }).join('')}
        `)
    }
  }

  $('#clear-cart-button').click(() => {
    clearCart();
  })

  function clearCart() {

    cartItems = {};
    itemCount = 0;
    summa     = 0;

    $totalSumma.text(`${summa} $`);
    $totalQuantity.text(`${itemCount / 10} kg.`);
    $headerCartCount.text("");

    createCard();
    $('.bag-counter__count').each(function() {
      $(this).val("0");
      updateAddToBagVisibility($(this));
    });

    
  }


}
bagCounting();

export {cartItems}