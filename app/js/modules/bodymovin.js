import lottie from "lottie-web";

const bm = document.querySelector('#bm');
const bm2 = document.querySelector('#bm2');
function bodyMovin () {
  lottie.loadAnimation({
    container: bm, // the dom element that will contain the animation
    renderer: 'svg',
    loop: false,
    autoplay: true,

    path: 'assets/design.json' // the path to the animation json
  });
  lottie.setSpeed(1);
  lottie.loadAnimation({
    container: bm2, // the dom element that will contain the animation
    renderer: 'svg',
    loop: false,
    autoplay: true,

    path: 'assets/auto.json' // the path to the animation json
  });
  lottie.setSpeed(1);
}



export default bodyMovin;