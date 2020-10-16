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
    document.querySelector('body').classList.toggle('lock');
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

//Icons animations
const weDev = document.querySelector('#web-dev-icon');
const autoIcon = document.querySelector('#auto-icon');
const designIcon = document.querySelector('#design-icon');
const adIcon = document.querySelector('#ad-icon');

export const weDevAnim= lottie.loadAnimation({
  container: weDev,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/prog.json'
});

export const autoAnim = lottie.loadAnimation({
  container: autoIcon,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/auto.json'
});
export const designAnim = lottie.loadAnimation({
  container: designIcon,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/design.json'
});
export const adAnim = lottie.loadAnimation({
  container: adIcon,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/rate.json'
});
weDevAnim.setSpeed(.5);
autoAnim.setSpeed(.5);
designAnim.setSpeed(.5);
adAnim.setSpeed(.5);
//END Icons animations
