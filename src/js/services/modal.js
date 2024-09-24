

import { fancyTextLaw, fancyText, fancyHtml } from '../utils/modalText.js';


function callModal(event,  text) {
  event.preventDefault();
  fancyHtml(text)
}

 function modalPolicy() {

  const policy = document.getElementById('policy-text'),
        policyLink = document.getElementById('footer__policy-link');
  
       

        [policy, policyLink].forEach(function (elem) {
          elem.addEventListener('click', function (event) {
            callModal(event, fancyTextLaw.policy)
          })
        })
  }

modalPolicy()


function modalTerms() {
    const terms = document.getElementById('footer__terms-link');

    terms.addEventListener('click', function (event) {
      callModal(event, fancyTextLaw.terms)
    })
  }
modalTerms()

function modalTechnicalWork() {
    const reviews = document.getElementById('reviews');

    reviews.addEventListener('click', function (event) {
      callModal(event, fancyText.technicalWork)
    })
  }

modalTechnicalWork()


export {callModal}
