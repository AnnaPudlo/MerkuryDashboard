let btn = document.getElementById('submitBtn');
let user = document.getElementById('ba-login');
let password = document.getElementById('ba-password');
let form = document.getElementById('ba-form-login');

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

  $('.ba-select').on('click', function () {
    $(this).prev().toggleClass('icon-angle-down')
    $(this).prev().toggleClass('icon-angle-up')
  })

});

//======= start using d3 =======//

//======= start sales chart =======//
let dataset = [
  { label: 'Websites', count: 12 },
  { label: 'Logo', count: 13 },
  { label: 'Social Media', count: 30 },
  { label: 'Adwords', count: 21 },
  { label: 'E-Commerce', count: 19 }
];

let width = 720;
let height = 360;
let radius = Math.min(width, height) / 2;
let donutWidth = 70;
let legendRectSize = 36;
let legendSpacing = 8;

let color = d3.scaleOrdinal().domain(dataset.length)
  .range(["#4b74e0", "#4164c2", "#3755a4", "#25396e", "#5584ff"])

let svg = d3.select('#ba-sales-chart svg')
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
  .attr('cx', legendRectSize / 2)
  .attr('cy', legendRectSize / 2)
  .attr('r', legendRectSize / 2)
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
//======= end sales chart =======//

//======= start report chart =======//
// let margin = { top: 10, right: 20, bottom: 20, left: 40 };
let margin = { top: 0, right: 0, bottom: 0, left: 20 };
let reportWidth = 768 - margin.left - margin.right;
let reportHeight = 400 - margin.top - margin.bottom;

let reportSvg = d3.select("#ba-report-chart svg")
  .attr("width", reportWidth + margin.left + margin.right)
  .attr("height", reportHeight + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

let reportData = [
  { date: "2019-01-01", value: 300 },
  { date: "2019-02-01", value: 370 },
  { date: "2019-03-01", value: 250 },
  { date: "2019-04-01", value: 500 },
  { date: "2019-05-01", value: 350 },
  { date: "2019-06-01", value: 740 },
  { date: "2019-07-01", value: 730 },
  { date: "2019-08-01", value: 400 },
  { date: "2019-09-01", value: 550 },
  { date: "2019-10-01", value: 300 },
  { date: "2019-11-01", value: 380 },
  { date: "2019-12-01", value: 290 },
];

function parseDate(d) {
  return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
}

for (let i = 0; i < reportData.length; i++)
  reportData[i] = parseDate(reportData[i]);
console.log(reportData);

let reportX = d3.scaleTime()
  .domain(d3.extent(reportData, function (d) { return d.date; }))
  .range([0, reportWidth]);
reportSvg.append("g")
  .attr("transform", "translate(0," + reportHeight + ")")
  .call(d3.axisBottom(reportX).ticks(12).tickSize(0).tickFormat(""));

let gridlinesV = d3.axisBottom()
  .tickFormat("")
  .tickSizeInner(reportHeight)
  .tickSizeOuter(0)
  .scale(reportX);

reportSvg.append("g")
  .attr("class", "gridV")
  .call(gridlinesV);

let reportY = d3.scaleLinear()
  .domain([100, 790])
  .range([reportHeight, 0]);
reportSvg.append("g").call(d3.axisLeft(reportY).ticks(5).tickSize(0));

let gridlinesH = d3.axisRight()
  .ticks(5)
  .tickSizeOuter(0)
  .tickFormat("")
  .tickSizeInner(reportWidth)
  .scale(reportY);

reportSvg.append("g")
  .attr("class", "gridH")
  .call(gridlinesH);


reportSvg.append("path")
  .datum(reportData)
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .curve(d3.curveBasis)
    .x(function (d) { return reportX(d.date) })
    .y(function (d) { return reportY(d.value) }))

//======= end report chart =======//