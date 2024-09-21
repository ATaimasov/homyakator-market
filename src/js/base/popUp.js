import { fancyHtml } from '../libs/popUpText.js';
import { fancyTextLaw, fancyText } from '../libs/popUpText.js';

function callPopUp(event,  text) {
  event.preventDefault();
  fancyHtml(text)
}

export function popUpPolicy() {

  const policy = document.getElementById('policy-text'),
        policyLink = document.getElementById('footer__policy-link');
       

        [policy, policyLink].forEach(function (elem) {
          elem.addEventListener('click', function (event) {
            callPopUp(event, fancyTextLaw.policy)
          })
        })


  }

  export function popUpTerms() {
    const terms = document.getElementById('footer__terms-link');

    terms.addEventListener('click', function (event) {
      callPopUp(event, fancyTextLaw.terms)
    })
  }

  export function popUpTechnicalWork() {
    const reviews = document.getElementById('reviews');

    reviews.addEventListener('click', function (event) {
      callPopUp(event, fancyText.technicalWork)
    })
  }