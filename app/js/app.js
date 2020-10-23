//import "./modules/function";
import "./modules/bodymovin";
import "./modules/slick";
import './modules/scrollAnimation';
import './modules/materialize';
import './modules/validate';



window.addEventListener('DOMContentLoaded', () => {
//  listener for portfolio desc show
  if(document.querySelector('.portfolio') && window.innerWidth > 768) {
    const portBtns = document.querySelectorAll('.body-project__btn');
    portBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        btn.parentElement.classList.toggle('active');
      })
    })
  }
//  --listener for portfolio desc show
//  Listener for services set option
  let orderBtns = document.querySelectorAll('.item-main-slider__btn');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelector(`${btn.getAttribute('href')} form`).reset();
      const service = btn.dataset.service;
      const options = document.querySelectorAll('#order-form select option');
      options.forEach(option => {
        if(option.value === service) {
          console.log('service set');
          option.setAttribute('selected','');
        }else {
          option.removeAttribute('selected');
        }
      })
    })
  })
//  Listener for services set option


})








