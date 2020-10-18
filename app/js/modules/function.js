export let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

export function canUseWebP() {
  let elem = document.createElement('canvas');
  if (!!(elem.getContext && elem.getContext('2d'))) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
}
// img like a BG by Cassidy
export function ibg(isWebP) {
  let ibgs = document.querySelectorAll('.ibg');
  ibgs.forEach((item) => {
    if(item.querySelector('img')){
      item.style.backgroundImage = (isWebP)? 'url('+item.querySelector('source').getAttribute('srcset')+')' : 'url('+item.querySelector('img').getAttribute('src')+')'
    }
  })
}
//end img like BG
const isWebPi = canUseWebP();
ibg(isWebPi); // запуск перевірки IBG. Функція визначить і при можливості замінить формат даного класу з JPEG в WEBP.


//footer copyright====================================================
(function generateCopyRight() {
  let spanElement = document.createElement('span');
  spanElement.innerHTML = `©${new Date().getFullYear()}р. <a href="/">D-wave studio</a> `;
  if(document.querySelector('.copyright')) {
    document.querySelector('.copyright__main').append(spanElement);
  }
})();
// end footer copyright


