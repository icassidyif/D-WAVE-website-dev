import lottie from "lottie-web";
import $ from "jquery";
import {supportsTouch} from "./function";

//Burger animation
const burgerContainer = document.querySelector('#burger-menu');

const burgerAnimation = lottie.loadAnimation({
  container: burgerContainer,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/burger.json'
});

burgerAnimation.setSpeed(1.2);

let burgerOpen = false;
let animationClickInProgress = false;

if(!supportsTouch){
  hoverBurger();
}
clickBurgerListener();

function hoverBurger() {
  $(burgerContainer).unbind('mouseenter mouseleave');
  $(burgerContainer).hover(
    // hover in
    () => {
      if(animationClickInProgress) {
        burgerAnimation.onComplete = () => {animationClickInProgress = false;}
      } else {
        hoverIn();
      }
    },
    //hover out
    () => {
      if(animationClickInProgress) {
        burgerAnimation.onComplete = () => {
          animationClickInProgress = false;
          hoverOut();
          hoverBurger();
        }
      } else {
        hoverOut();
      }
    })
}

function clickBurgerListener() {
  $(burgerContainer).click(() => {
    burgerOpen = !burgerOpen;
    const mainMenu = document.querySelector('.main-menu');
    mainMenu.classList.toggle('active');
    if(supportsTouch) {
      clickBurger();
    } else {
      clickBurger();
      animationClickInProgress = true;
      hoverBurger();
      burgerAnimation.onComplete = () => {animationClickInProgress = false; hoverBurger();}
    }
  })
}
function clickBurger() {
  $(burgerContainer).unbind('mouseenter mouseleave');
  if(supportsTouch) {
    burgerOpen? burgerAnimation.playSegments([0, 20], true) : burgerAnimation.playSegments([20, 0], true);
  } else {
    burgerOpen? burgerAnimation.playSegments([10, 20], true) : burgerAnimation.playSegments([20, 10], true);
  }
}
function hoverIn() {
  burgerOpen? burgerAnimation.playSegments([20, 30], true) : burgerAnimation.playSegments([0, 10], true);
  burgerAnimation.onComplete = () => {};
}
function hoverOut() {
  burgerOpen? burgerAnimation.playSegments([30, 20], true) : burgerAnimation.playSegments([10, 0], true);
  burgerAnimation.onComplete = () => {};
}
//End Burger animation

