import $ from 'jquery';
import 'materialize-css';
import {supportsTouch} from "./function";

document.addEventListener('DOMContentLoaded', function() {
  //pushpin
  $('.project-portfolio__slider').on('init', function () {
    $(this).css('visibility', 'visible');
    let pushPinElements = document.querySelectorAll('.pushpin');
    pushPinElements.forEach(element => {
      const target = element.parentElement;
      // console.log($(target).offset().top);
      // console.log($(target).outerHeight());
      // console.log($(element).outerHeight());
      let settings = {
        top: $(target).offset().top,
        bottom: $(target).offset().top + $(target).outerHeight() - $(element).outerHeight(),
        offset: 100,
        onPositionChange: function (className) {
          if(className === 'pinned') {
            $(target).css('padding-top', $(element).outerHeight() + 'px');
          } else {
            $(target).css('padding-top', 'unset');
          }
        }
      };
      M.Pushpin.init(element, settings);
    })
  });
  //End pushpin

  // All modal windows
  let modals = document.querySelectorAll('.modal:not(.body-project__content)');
  if (supportsTouch) {
    let modalInstances = M.Modal.init(modals, {
      startingTop: '0%',
      endingTop: '0%'
    });
  } else {
    let modalInstances = M.Modal.init(modals);
  }
  // END All modal windows


  // Modal windows for portfolio projects
  let modalProjectWindows = document.querySelectorAll('.body-project__content');
  if (window.innerWidth < 768) {
    let instances = M.Modal.init(modalProjectWindows);
  } else {
    modalProjectWindows.forEach(modalWindow => {
      modalWindow.classList.remove('modal');
    })
  }
  // End modal windows for portfolio projects

  // Select inputs
  let selectInputs = document.querySelectorAll('select');
  let selectInstances = M.FormSelect.init(selectInputs);
  // END Select inputs
});



