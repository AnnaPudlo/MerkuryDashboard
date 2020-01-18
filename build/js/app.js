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
$(document).ready(function () {
  $('.ba-menu-btn').on('click', function () {
    $('.ba-menu').toggle();
  });
  $(window).on('resize', function () {
    if ($(this).width() > 768) {
      $('.ba-menu').show();
    } else {
      $('.ba-menu').hide();
    }
  });
}); //======= start using d3 =======//

var dataset = [{
  label: 'Websites',
  count: 12
}, {
  label: 'Logo',
  count: 13
}, {
  label: 'Social Media',
  count: 30
}, {
  label: 'Adwords',
  count: 21
}, {
  label: 'E-Commerce',
  count: 19
}];
var width = 360;
var height = 180;
var radius = Math.min(width, height) / 2;
var donutWidth = 35;
var legendRectSize = 18;
var legendSpacing = 4;
var color = d3.scaleOrdinal().domain(dataset.length).range(["#4b74e0", "#4164c2", "#3755a4", "#25396e", "#5584ff"]);
var svg = d3.select('#ba-sales-chart').append('svg').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + width / 4 + ',' + height / 2 + ')');
var arc = d3.arc().innerRadius(radius - donutWidth).outerRadius(radius);
var pie = d3.pie().value(function (d) {
  return d.count;
}).sort(null);
var path = svg.selectAll('path').data(pie(dataset)).enter().append('path').attr('d', arc).attr('fill', function (d, i) {
  return color(d.data.label);
});
var legend = svg.selectAll('.legend').data(color.domain()).enter().append('g').attr('class', 'legend').attr('transform', function (d, i) {
  var height = legendRectSize + legendSpacing;
  var offset = height * color.domain().length / 2;
  var horz = radius + legendRectSize;
  var vert = i * height - offset;
  return 'translate(' + horz + ',' + vert + ')';
});
legend.append('circle').attr('cx', legendRectSize / 2).attr('cy', legendRectSize / 2).attr('r', legendRectSize / 2).style('fill', color).style('stroke', color);
legend.append('text').attr('x', legendRectSize + legendSpacing).attr('y', legendRectSize - legendSpacing).text(function (d) {
  return d;
});
svg.append('text').attr('x', 0).attr('y', 0).text('1,560 sales');