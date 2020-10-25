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
      let formData = $(form).serializeArray();
      ajaxContactForm(formData);
      form.reset();
      M.toast({html: 'Дякуємо за звернення, скоро ми з вами зв\'яжемось'});
    }
  });


  $('#order-form').validate({
    rules: {
      service: {
        required: true
      },
      name: {
        required: true
      },
      phone: {
        required: true,
        customPhone: true
      },
      email: {
        required: true
      }

    },
    messages: {
      service: {
        required: "Це обов'язкове поле"
      },
      name: {
        required: "Це обов'язкове поле"
      },
      phone: {
        required: "Це обов'язкове поле",
        customPhone: 'Невірний номер телефону'
      },
      email:{
        required: "Це обов'язкове поле",
      }
    },
    submitHandler: function (form) {
      // let url = '/php/call.php';
      let formData = $(form).serializeArray();
      ajaxOrderForm(formData);
      form.reset();
      M.toast({html: 'Дякуємо за звернення, скоро ми з вами зв\'яжемось'});
      let modal = M.Modal.getInstance($('#modal-order'));
      modal.close();
    }
  });

})
