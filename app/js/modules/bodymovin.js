import lottie from "lottie-web";
import $ from "jquery";

//Burger animation
const burgerContainer = document.querySelector('#bm2');

let burgerAnimation = lottie.loadAnimation({
  container: burgerContainer,
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/burger.json'
});

burgerAnimation.setSpeed(1.1);

let burgerOpen = false;
let animationClickInProgress = false;

hoverBurger();
clickBurger();

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

function clickBurger() {
  $(burgerContainer).click(() => {
    burgerOpen = !burgerOpen;
    if(!burgerOpen) {
      $(burgerContainer).unbind('mouseenter mouseleave');
      burgerAnimation.playSegments([20, 10], true);
      animationClickInProgress = true;
      hoverBurger();
      burgerAnimation.onComplete = () => {animationClickInProgress = false; hoverBurger();}
    }else {
      $(burgerContainer).unbind('mouseenter mouseleave');
      burgerAnimation.playSegments([10, 20], true);
      animationClickInProgress = true;
      hoverBurger();
      burgerAnimation.onComplete = () => {animationClickInProgress = false; hoverBurger();}
    }
  })
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


