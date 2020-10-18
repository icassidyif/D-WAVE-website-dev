//import "./modules/function";
import "./modules/bodymovin";
import "./modules/slick";
import './modules/scrollAnimation';
import './modules/materialize';



window.addEventListener('DOMContentLoaded', () => {
//  listener for portfoio desc show
  if(document.querySelector('.portfolio') && window.innerWidth > 768) {
    const portBtns = document.querySelectorAll('.body-project__btn');
    portBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        btn.parentElement.classList.toggle('active');
      })
    })
  }
//  --listener for portfoio desc show


})








