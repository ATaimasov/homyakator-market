 import { slider } from "../services/carousel.js";
 
 // filters script

 const filterItems = $('.goods__filter-item');
 let filtered = false;
 const makeFiltered = (event, filterClass) => {
 const target = $(event.target);
   
     if (target.hasClass("goods__filter-item--active")) {
       target.removeClass("goods__filter-item--active");
       slider.slick('goTo', 0);
       
       
       if (!target.hasClass("goods__filter-item--active")) {
         slider.slick('slickUnfilter');
       }
       return;
     }
   
     filterItems.not(target).removeClass("goods__filter-item--active");
     target.addClass("goods__filter-item--active");
     slider.slick('goTo', 0);
   
     if (filtered) {
       slider.slick('slickUnfilter');
     }
   
     slider.slick(`slickFilter`, `.${filterClass}`);
     filtered = true;
   }
   
 $('#mix').on('click', (event) => makeFiltered(event, 'mix'));
 $('#set').on('click', (event) => makeFiltered(event, 'set'));
 $('#new').on('click', (event) => makeFiltered(event, 'new'));
 $('#grains').on('click', (event) => makeFiltered(event, 'grains'));
 $('#dry').on('click', (event) => makeFiltered(event, 'dry'));
 $('#discount').on('click', (event) => makeFiltered(event, 'discount'));
 $('#exotic').on('click', (event) => makeFiltered(event, 'exotic'));
 $('#healthy').on('click', (event) => makeFiltered(event, 'healthy'));
 
 // pressing shop button cancel active filters
 $('#shop-now-button').on('click', () => {
   slider.slick('goTo', 0);
   slider.slick('slickUnfilter');
   filterItems.removeClass("goods__filter-item--active");
 });


 export {filterItems}