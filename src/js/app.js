import  './libs/jquery.min.js';
import './plugins/slick.min.js';
import './base/script.js';

import { popUpPolicy, popUpTerms, popUpTechnicalWork} from './base/popUp.js'
popUpPolicy();
popUpTerms();
popUpTechnicalWork();

import {contactForm} from './base/form.js'
contactForm();

// import {cartMenu} from './base/cart.js'
// cartMenu();
