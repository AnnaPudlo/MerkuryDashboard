let btn = document.getElementById('submitBtn');
let user = document.getElementById('ba-login');
let password = document.getElementById('ba-password');
let form = document.getElementById('ba-form-login');

//======= start authorization =======//
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
//======= end authorization =======//

$(document).ready(function () {

  //======= start menu-btn (mobile-first) =======//
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
  //======= end menu-btn (mobile-first) =======//


  //======= start menu-btn (desktop full screen) =======//
  $('.ba-menu-btn__main').on('click', function () {
    $('.ba-header').toggleClass('ba-header--hidden');
    $('.ba-main').toggleClass('ba-main--full');
    $('.ba-menu-btn__main').prev('span').toggleClass('icon-left-dir');
  })
  //======= end menu-btn (desktop full screen) =======//

  $('#showSearch').on('click', function (){
    $('.ba-search-form').toggle();
    $('#showSearch').toggleClass('icon-search icon-cancel')
  })

  //======= start customize select arrow =======//

  $('.ba-select').on('click', function () {
    $(this).prev().toggleClass('icon-angle-down')
    $(this).prev().toggleClass('icon-angle-up')
  })
  //======= end customize select arrow =======//

});

//======= start using d3 =======//

//======= start sales chart =======//
let dataset = [
  { label: 'Websites', count: 188 },
  { label: 'Logo', count: 202},
  { label: 'Social Media', count: 468 },
  { label: 'Adwords', count: 359 },
  { label: 'E-Commerce', count: 343 }
];

let width = 720;
let height = 360;
let radius = Math.min(width, height) * 0.45;
let donutWidth = 70;
let legendRectSize = 36;
let legendSpacing = 8;

let dataTotal = 0;

for (let i = 0; i < dataset.length; i++) {
  dataTotal+=dataset[i].count;
}
console.log(dataTotal);

let color = d3.scaleOrdinal().domain(dataset.length)
  .range(["#4b74e0", "#4164c2", "#3755a4", "#25396e", "#5584ff"])

let svg = d3.select('#ba-sales-chart svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + (width / 3) + ',' + (height / 2) + ')');

let arc = d3.arc()
  .innerRadius(radius - donutWidth)
  .outerRadius(radius);

let pie = d3.pie()
  .value(function (d) { return d.count; })
  .sort(null);

let div = d3.select('#ba-sales-chart').append('div')
  .attr('class', 'tooltip-donut')
  .style('opacity', 0);

let path = svg.selectAll('path')
  .data(pie(dataset))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function (d, i) {
    return color(d.data.label);
  })
  .on('mouseover', function (d, i) {
    d3.select(this).transition()
      .duration('100')
      .attr('transform', 'scale(1.1)')
      .attr('fill', '#f83c7b');
    div.transition()
      .duration(100)
      .style("opacity", 1);
    let num = (Math.round((d.value / dataTotal) * 100)).toString() + '%';
    div.html(num)
      .style("left", (d3.event.pageX - 10) + "px")
      .style("top", (d3.event.pageY - 10) + "px");})
  .on('mouseout', function (d, i) {
    d3.select(this).transition()
      .duration('100')
      .attr('transform', 'scale(1)')
      .attr('fill', color(d.data.label))
    div.transition()
      .duration('100')
      .style("opacity", 0);});

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

svg.append("foreignObject")
    .attr("width", 100)
    .attr("height", 80)
    .attr('x', -40)
    .attr('y', -40)
  .append("xhtml:body")
    .html("<h1 class='salesCount' style='font-size: 36px; color: #8492af'>"+dataTotal+" sales</h1>")
//======= end sales chart =======//

//======= start report chart =======//
// let margin = { top: 10, right: 20, bottom: 20, left: 40 };
let margin = { top: 0, right: 0, bottom: 0, left: 60 };
let reportWidth = 1000 - margin.left - margin.right;
let reportHeight = 400 - margin.top - margin.bottom;

let reportSvg = d3.select("#ba-report-chart svg")
  .attr("width", reportWidth + margin.left + margin.right)
  .attr("height", reportHeight + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

let reportData = [
  { date: "2019-01-01", value: 300 },
  { date: "2019-02-01", value: 350 },
  { date: "2019-03-01", value: 290 },
  { date: "2019-04-01", value: 450 },
  { date: "2019-05-01", value: 350 },
  { date: "2019-06-01", value: 740 },
  { date: "2019-07-01", value: 640 },
  { date: "2019-08-01", value: 410 },
  { date: "2019-09-01", value: 490 },
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
  .ticks(12)
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
    .curve(d3.curveCatmullRom.alpha(0.15))
    .x(function (d) { return reportX(d.date) })
    .y(function (d) { return reportY(d.value) }))

let dataTool = d3.select('#ba-report-chart')
  .append('div')
  .style('opacity', 0)
  .attr('class', 'tooltip-scatter');

reportSvg.append('g')
  .selectAll('dot')
  .data(reportData)
  .enter()
  .append('circle')
    .attr('class', 'scatterDot')
    .attr('cx', function(d) { return reportX(d.date) })
    .attr('cy', function (d) { return reportY(d.value) })
    .attr('r', 5)
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'white')
  .on('mouseover', function (d, i) {
    d3.select(this).transition()
      .duration('100')
      .attr('r', 10)
      .attr('stroke-width', 4)
      .attr('fill', '#f83c7b')
    dataTool.transition()
      .duration(100)
      .style("opacity", 1);
    dataTool.html("Exact value: " + d.value)
      .style("left", (d3.event.pageX - 40) + "px")
      .style("top", (d3.event.pageY - 40) + "px");})
  .on('mouseout', function (d, i) {
    d3.select(this).transition()
      .duration('100')
      .attr('r', 5)
      .attr('stroke-width', 2)
      .attr('fill', 'white')
    dataTool.transition()
      .duration('100')
      .style("opacity", 0);});

//======= end report chart =======//

//======= start total chart =======//
let totalWidth = 500;
let totalHeight = 500;

let tau = 2 * Math.PI;
let totalArc = d3.arc()
  .innerRadius(180)
  .outerRadius(240)
  .startAngle(0)
  .cornerRadius(30);

let total1 = d3.select("#ba-total-chart1 svg")
  .attr('width', totalWidth)
  .attr('height', totalHeight);
let totalG = total1.append('g')
  .attr('transform', 'translate(' + totalWidth /2 + ',' + totalHeight /2 + ')');
  

let totalBg = totalG.append('path')
  .datum({endAngle: tau})
  .style("fill", "#ddd")
  .attr('d', totalArc);

let totalFg = totalG.append('path')
  .datum({endAngle: 0.45 * tau})
  .style('fill', 'blue')
  .attr('d', totalArc);

let total2 = d3.select("#ba-total-chart2 svg")
  .attr('width', totalWidth)
  .attr('height', totalHeight);
totalG = total2.append('g')
  .attr('transform', 'translate(' + totalWidth /2 + ',' + totalHeight /2 + ')');
  
totalBg = totalG.append('path')
  .datum({endAngle: tau})
  .style("fill", "#ddd")
  .attr('d', totalArc);

totalFg = totalG.append('path')
  .datum({endAngle: 0.20 * tau})
  .style('fill', 'blue')
  .attr('d', totalArc);

let total3 = d3.select("#ba-total-chart3 svg")
  .attr('width', totalWidth)
  .attr('height', totalHeight);
totalG = total3.append('g')
  .attr('transform', 'translate(' + totalWidth /2 + ',' + totalHeight /2 + ')');
  
totalBg = totalG.append('path')
  .datum({endAngle: tau})
  .style("fill", "#ddd")
  .attr('d', totalArc);

totalFg = totalG.append('path')
  .datum({endAngle: 0.35 * tau})
  .style('fill', 'blue')
  .attr('d', totalArc);

//======= end total chart =======//