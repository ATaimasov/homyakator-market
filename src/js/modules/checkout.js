import { Fancybox } from '@fancyapps/ui';
import { contactForm } from './form.js'
import { fancyText } from '../utils/modalText.js';
import {callModal} from '../services/modal.js'


function callCheckout() {
    const checkoutButton = document.getElementById('cart-button');
  
    checkoutButton.addEventListener('click', function (event) {
      event.preventDefault();
      Fancybox.show([{ src: fancyText.checkout, type: "html"}], {
        on: {
          "done": (fancybox, slide) => {
          
            const checkoutPolicyLink = document.getElementById('checkout__policy-link'),
                  form = document.getElementById('checkout-form');
  
            checkoutPolicyLink.addEventListener('click', function (event) {
              callModal(event, fancyTextLaw.policy)
            })
  
            contactForm(form);
            
          },
        }
      })
    })
    
  }
  
  callCheckout()
  