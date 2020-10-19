import $ from 'jquery';
import 'jquery-mask-plugin';
import 'jquery-validation';


$(document).ready(function(){
  $("select").css({
    display: "block",
    position: 'absolute',
    visibility: 'hidden'
  });

  $("#phone-contact").mask("+38 (999) 999-99-99");

  $.validator.addMethod('customPhone', function (value, element) {
    return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
  }, "Please enter a valid phone number");



  $('#contact-form').validate({
    rules: {
      name: {
        required: true
      },
      phone: {
        required: true,
        customPhone: true
      },
      cartOrderMessage: {
      }
    },
    messages: {
      name: {
        required: "Це обов'язкове поле"
      },
      phone: {
        required: "Це обов'язкове поле",
        customPhone: 'Невірний номер телефону'
      }
    },
    submitHandler: function (form) {
      // let url = '/php/call.php';
      let formData = $(form).serializeArray();
      // ajaxSend(formData, url);
      console.log(formData);
      //clear
      form.reset();
      M.toast({html: 'Дякуємо за звернення, скоро ми з вами зв\'яжемось'});
      // cart.products = {};
      // products = cart.products;
      // loadToLocalStorage();
      // updateCartContent();
      // let modal = M.Modal.getInstance($('#cart'));
      // modal.close();
    }
  });



})
