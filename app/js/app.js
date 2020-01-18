let btn = document.getElementById('submitBtn');
let user = document.getElementById('ba-login');
let password = document.getElementById('ba-password');
let form = document.getElementById('ba-form');

$(form).on('submit', function (e) {
  e.preventDefault();

  fetch('https://jsonplaceholder.typicode.com/users?username=' + user.value + '&email=' + password.value)
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

//======= start using d3 =======//
let dataset = [
  { label: 'Websites', count: 12 },
  { label: 'Logo', count: 13 },
  { label: 'Social Media', count: 30 },
  { label: 'Adwords', count: 21 },
  { label: 'E-Commerce', count: 19 }
];

let width = 360;
let height = 180;
let radius = Math.min(width, height) / 2;
let donutWidth = 35;
let legendRectSize = 18;
let legendSpacing = 4;

let color = d3.scaleOrdinal().domain(dataset.length)
.range(["#4b74e0", "#4164c2", "#3755a4", "#25396e", "#5584ff"])

let svg = d3.select('#ba-sales-chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 4) + ',' + (height / 2) + ')');

let arc = d3.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

let pie = d3.pie()
  .value(function (d) { return d.count; })
  .sort(null);

let path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function (d, i) {
    return color(d.data.label);
  });

let legend = svg.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function (d, i) {
    let height = legendRectSize + legendSpacing;
    let offset = height * color.domain().length / 2;
    let horz = radius + legendRectSize;
    let vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
  });

legend.append('circle')
  .attr('cx', legendRectSize/2)
  .attr('cy', legendRectSize/2)
  .attr('r', legendRectSize/2)
  .style('fill', color)
  .style('stroke', color);

legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function (d) { return d; });

svg.append('text')
  .attr('x', 0)
  .attr('y', 0)
  .text('1,560 sales')