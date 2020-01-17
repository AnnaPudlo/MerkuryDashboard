let btn = document.getElementById('submitBtn');
let user = document.getElementById('ba-login');
let password = document.getElementById('ba-password');
let form = document.getElementById('ba-form');

$(form).on('submit', function(e) {
  e.preventDefault();

  fetch('https://jsonplaceholder.typicode.com/users?username='+user.value+'&email='+password.value)
  .then(response => response.json())
  .then(json => {
    if (json.length != 0) {
      window.location = 'dashboard.html';
      // console.log("hello, "+json[0].name)
    };
  });
});

$(document).ready(function () {
  $('.ba-menu-btn').on('click', function () {
      $('.ba-menu').toggle();
  })

  $(window).on('resize', function () {
      if ($(this).width() > 768) {
          $('.ba-menu').show();
      } else {
          $('.ba-menu').hide();
      }
  })
});