"use strict";

var btn = document.getElementById('submitBtn');
var user = document.getElementById('ba-login');
var password = document.getElementById('ba-password');
var form = document.getElementById('ba-form');
$(form).on('submit', function (e) {
  e.preventDefault();
  fetch('https://jsonplaceholder.typicode.com/users?username=' + user.value + '&email=' + password.value).then(function (response) {
    return response.json();
  }).then(function (json) {
    if (json.length != 0) {
      window.location = 'dashboard.html'; // console.log("hello, "+json[0].name)
    }

    ;
  });
});