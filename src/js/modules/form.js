import { fancyHtml, fancyText } from '../utils/modalText.js';
import {cartItems} from './bagCounter.js'

const form = document.getElementById('contact');

const contactForm = (form) => {

    

    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
    
        let error = formValidate(form);
    
        let formData = new FormData(form);
        formData.append('name', form.elements['name'].value);
        formData.append('email', form.elements['email'].value);
    
        Object.entries(cartItems).forEach(([key, product]) => {
            Object.entries(product).forEach(([field, value]) => {
                formData.append(`products[${key}][${field}]`, value);
            });
        });

       
    
        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('phpmailer/sendmail.php', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                let result = await response.json();
                
                    form.reset();
                    form.classList.remove('_sending');
                    fancyHtml(fancyText.successSend);
    
            } else {
                    fancyHtml(fancyText.errorSend);
                    form.classList.remove('_sending');
            }
        } else {
            form.classList.remove('_sending');
            fancyHtml(fancyText.requiredFields)
        }
    }

function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i=0; i < formReq.length; i++) {
        const input = formReq[i];
        formRemoveError(input);

        if (input.classList.contains('_email')) {
            if (emailTest(input)) {
                formAddError(input);
                error++;
            }
        } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
            formAddError(input);
            error++;
        } else {
            if (input.value === '') {
                formAddError(input);
                error++;
            }
        }
    }
    return error;
}


function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
}

function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
}

function emailTest(input) { 
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

}

contactForm(form);



// click on contact-header refer you to first name input
$('#contact-header').on('click',(() => {
    $('#contact-form-first-name').trigger('focus');
  })
)
  

export {contactForm}
