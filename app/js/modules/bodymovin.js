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


let burgerOpen = false;
let animationClickInProgress = false;

hoverBurger();
clickBurger();

function hoverBurger() {
  if(burgerOpen) {
    $(burgerContainer).unbind('mouseenter mouseleave');
  } else {
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
          burgerAnimation.onComplete = () => {animationClickInProgress = false; hoverOut(); hoverBurger();}
        } else {
          hoverOut();
        }
      })
  }
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
    }
  })
}

function hoverIn() {
  burgerAnimation.playSegments([0, 10], true);
  burgerAnimation.onComplete = () => {};
}
function hoverOut() {
  burgerAnimation.playSegments([10, 0], true);
  burgerAnimation.onComplete = () => {};
}


export {burgerAnimation};