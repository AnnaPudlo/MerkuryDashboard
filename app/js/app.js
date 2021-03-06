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
      if (json.length == 0) {
        $('.errorWrap').show();
        // console.log("hello, "+json[0].name)
      }
      else {
        window.location = 'dashboard.html';
      }
    });
});
//======= end authorization =======//

$('.ba-btn').hover(
  function () {
      $(this).addClass('animated heartBeat');
  },
  function () {
      $(this).removeClass('animated heartBeat');
});

let taskBadgeArr = document.querySelectorAll('.ba-task-badge');
for (let i=0; i<taskBadgeArr.length; i++) {
  $(taskBadgeArr[i]).text($(taskBadgeArr[i]).closest('.ba-task').find('.ba-task__title').text().charAt(0));
}

$(document).ready(function () {

  //======= start select for redrawing charts =======//
  $('select').niceSelect();

  $('#ba-sales__select').change(function () {
    let dataset = [
      [
        { label: 'Websites', count: 188 },
        { label: 'Logo', count: 202 },
        { label: 'Social Media', count: 468 },
        { label: 'Adwords', count: 359 },
        { label: 'E-Commerce', count: 343 }
      ],

      [
        { label: 'Websites', count: 120 },
        { label: 'Logo', count: 304 },
        { label: 'Social Media', count: 210 },
        { label: 'Adwords', count: 158 },
        { label: 'E-Commerce', count: 403 }
      ],

      [
        { label: 'Websites', count: 298 },
        { label: 'Logo', count: 132 },
        { label: 'Social Media', count: 158 },
        { label: 'Adwords', count: 359 },
        { label: 'E-Commerce', count: 303 }
      ]];

    console.log(this.value);
    d3.select('#ba-sales-chart svg *').remove();
    donutDraw(dataset[this.value]);
  });

  $("#ba-report__select").change(function () {
    let dataset = [
      [
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
      ],
      [
        { date: "2019-01-01", value: 330 },
        { date: "2019-02-01", value: 350 },
        { date: "2019-03-01", value: 320 },
        { date: "2019-04-01", value: 540 },
        { date: "2019-05-01", value: 520 },
        { date: "2019-06-01", value: 740 },
        { date: "2019-07-01", value: 640 },
        { date: "2019-08-01", value: 410 },
        { date: "2019-09-01", value: 440 },
        { date: "2019-10-01", value: 370 },
        { date: "2019-11-01", value: 380 },
        { date: "2019-12-01", value: 290 },
      ],
      [
        { date: "2019-01-01", value: 460 },
        { date: "2019-02-01", value: 500 },
        { date: "2019-03-01", value: 350 },
        { date: "2019-04-01", value: 450 },
        { date: "2019-05-01", value: 290 },
        { date: "2019-06-01", value: 370 },
        { date: "2019-07-01", value: 510 },
        { date: "2019-08-01", value: 450 },
        { date: "2019-09-01", value: 690 },
        { date: "2019-10-01", value: 420 },
        { date: "2019-11-01", value: 320 },
        { date: "2019-12-01", value: 380 },
      ]
    ];
    d3.select('#ba-report-chart svg *').remove();
    scatterDraw(dataset[this.value], "#ba-report-chart");
  });

  //======= end select for redrawing charts =======//

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

  $('#showSearch').on('click', function () {
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


function donutDraw(somedata) {
  let dataset = somedata;
  let width = 720;
  let height = 360;
  let radius = Math.min(width, height) * 0.45;
  let donutWidth = 70;
  let legendRectSize = 36;
  let legendSpacing = 8;

  let dataTotal = 0;

  for (let i = 0; i < dataset.length; i++) {
    dataTotal += dataset[i].count;
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
        .style("top", (d3.event.pageY - 10) + "px");
    })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
        .duration('100')
        .attr('transform', 'scale(1)')
        .attr('fill', color(d.data.label))
      div.transition()
        .duration('100')
        .style("opacity", 0);
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

  svg.append("foreignObject")
    .attr("width", 100)
    .attr("height", 80)
    .attr('x', -40)
    .attr('y', -40)
    .append("xhtml:body")
    .html("<h1 class='salesCount' style='font-size: 36px; color: #8492af'>" + dataTotal + " sales</h1>")
}

let dataset2019 = [
  { label: 'Websites', count: 188 },
  { label: 'Logo', count: 202 },
  { label: 'Social Media', count: 468 },
  { label: 'Adwords', count: 359 },
  { label: 'E-Commerce', count: 343 }
]
donutDraw(dataset2019);


//======= end sales chart =======//

//======= start report chart =======//
function parseDate(d) {
  return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value }
}

function scatterDraw(someData, path) {
  let margin = { top: 0, right: 0, bottom: 0, left: 60 };
  let reportWidth = 1000 - margin.left - margin.right;
  let reportHeight = 400 - margin.top - margin.bottom;

  let reportSvg = d3.select(path + " svg")
    .attr("width", reportWidth + margin.left + margin.right)
    .attr("height", reportHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  let reportData = someData;

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

  let dataTool = d3.select(path)
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip-scatter');

  reportSvg.append('g')
    .selectAll('dot')
    .data(reportData)
    .enter()
    .append('circle')
    .attr('class', 'scatterDot')
    .attr('cx', function (d) { return reportX(d.date) })
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
        .style("top", (d3.event.pageY - 40) + "px");
    })
    .on('mouseout', function (d, i) {
      d3.select(this).transition()
        .duration('100')
        .attr('r', 5)
        .attr('stroke-width', 2)
        .attr('fill', 'white')
      dataTool.transition()
        .duration('100')
        .style("opacity", 0);
    });
}

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
let activeData = [
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

scatterDraw(reportData, "#ba-report-chart");
scatterDraw(activeData, "#ba-active-chart");
//======= end report chart =======//

//======= start total chart =======//
function arcDraw(angle, road, fillColor) {
  let totalWidth = 500;
  let totalHeight = 500;

  let tau = 2 * Math.PI;
  let totalArc = d3.arc()
    .innerRadius(180)
    .outerRadius(240)
    .startAngle(0)
    .cornerRadius(30);

  let total1 = d3.select(road)
    .attr('width', totalWidth)
    .attr('height', totalHeight);
  let totalG = total1.append('g')
    .attr('transform', 'translate(' + totalWidth / 2 + ',' + totalHeight / 2 + ')');


  let totalBg = totalG.append('path')
    .datum({ endAngle: tau })
    .style("fill", "#ddd")
    .attr('d', totalArc);

  let totalFg = totalG.append('path')
    .datum({ endAngle: angle * tau })
    .style('fill', fillColor)
    .attr('d', totalArc);

  total1.select('g').append("foreignObject")
    .attr("width", 100)
    .attr("height", 80)
    .attr('x', -30)
    .attr('y', -30)
    .append("xhtml:body")
    .html("<h1 class='salesCount' style='font-size: 48px; color:" + fillColor + "'>" + angle * 100 + "%</h1>");

  d3.timeout(function () {
    totalFg.transition()
      .duration(2500)
      .attrTween("d", arcTween(angle * tau));
  }, 200);

  function arcTween(newAngle) {

    return function (d) {

      var interpolate = d3.interpolate(0, newAngle);

      return function (t) {
        d.endAngle = interpolate(t);
        return totalArc(d);
      };
    };
  }

}

arcDraw(0.45, "#ba-total-chart1 svg", '#5786fe');
arcDraw(0.20, "#ba-total-chart2 svg", '#aa5fb9');
arcDraw(0.35, "#ba-total-chart3 svg", '#f83c7b');

//======= end total chart =======//

let margin = { top: 0, right: 0, bottom: 0, left: 60 };
let totalSalesWidth = 1000 - margin.left - margin.right;
let totalSalesHeight = 400 - margin.top - margin.bottom;

let totalSalesSvg = d3.select("#ba-sales-line1 svg")
  .attr("width", totalSalesWidth + margin.left + margin.right)
  .attr("height", totalSalesHeight + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

let totalSales1Svg = d3.select("#ba-sales-line2 svg")
  .attr("width", totalSalesWidth + margin.left + margin.right)
  .attr("height", totalSalesHeight + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

let totalSalesData = [
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

for (let i = 0; i < totalSalesData.length; i++)
  totalSalesData[i] = parseDate(totalSalesData[i]);
console.log(totalSalesData);

let tsX = d3.scaleTime()
  .domain(d3.extent(totalSalesData, function (d) { return d.date; }))
  .range([0, totalSalesWidth]);
totalSalesSvg.append("g")
  .attr("transform", "translate(0," + totalSalesHeight + ")");
totalSales1Svg.append("g")
  .attr("transform", "translate(0," + totalSalesHeight + ")");

let tsY = d3.scaleLinear()
  .domain([100, 790])
  .range([totalSalesHeight, 0]);

totalSalesSvg.append("path")
  .datum(totalSalesData)
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 4)
  .attr("d", d3.line()
    .curve(d3.curveCatmullRom.alpha(0.15))
    .x(function (d) { return tsX(d.date) })
    .y(function (d) { return tsY(d.value) }));

totalSales1Svg.append("path")
  .datum(totalSalesData)
  .attr("fill", "none")
  .attr("stroke", "fuchsia")
  .attr("stroke-width", 4)
  .attr("d", d3.line()
    .curve(d3.curveCatmullRom.alpha(0.15))
    .x(function (d) { return tsX(d.date) })
    .y(function (d) { return tsY(d.value) }));


//======= end using d3.js =======//

//======= start workflow drag & drop =======//
let ddData;
let ddItems = localStorage.getItem('ddItems') ? JSON.parse(localStorage.getItem('ddItems')) : { div1: [], div2: [], div3: [] };
localStorage.setItem('ddItems', JSON.stringify(ddItems));
ddData = JSON.parse(localStorage.getItem('ddItems'));

if (document.getElementById('div1')) {
  if (ddData.div1.length != 0) {
    for (let i = 0; i < ddData.div1.length; i++) {
      ifCompleted(ddData.div1[i]);
      document.getElementById('div1').append(document.getElementById(ddData.div1[i]));
    }
  }

  if (ddData.div2.length != 0) {
    for (let i = 0; i < ddData.div2.length; i++) {
      ifCompleted(ddData.div2[i]);
      document.getElementById('div2').append(document.getElementById(ddData.div2[i]));
    }
  }

  if (ddData.div3.length != 0) {
    for (let i = 0; i < ddData.div3.length; i++) {
      toCompleted(ddData.div3[i]);
      document.getElementById('div3').append(document.getElementById(ddData.div3[i]));
    }
  }
}

function updateCounts() {
  let arrCounts = $('.elemCount');
  for (let i = 0; i < arrCounts.length; i++)
    $(arrCounts[i]).text(function () {
      let count = $(arrCounts[i]).closest('.ba-section').find('.ba-tasks').children().length;
      return '(' + count + ')';
    });
}

updateCounts();

function allowDrow(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  let parent = ev.currentTarget.parentElement;
  ev.dataTransfer.setData("parent", parent.getAttribute('id'));
}
function drop(ev, block) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  if (block.id == "div3") {
    toCompleted(data);
    removeIfExist(data);
    ddItems.div3.push(data);
  } else {
    ifCompleted(data);
    if (block.id == "div1") { removeIfExist(data); ddItems.div1.push(data) };
    if (block.id == "div2") { removeIfExist(data); ddItems.div2.push(data) };
  }

  block.appendChild(document.getElementById(data));
  localStorage.setItem('ddItems', JSON.stringify(ddItems));
  updateCounts();
}

function removeIfExist(el) {
  if (ddItems.div1.includes(el))
    ddItems.div1.splice(ddItems.div1.indexOf(el), 1);
  if (ddItems.div2.includes(el))
    ddItems.div2.splice(ddItems.div2.indexOf(el), 1);
  if (ddItems.div3.includes(el))
    ddItems.div3.splice(ddItems.div3.indexOf(el), 1);
}

function ifCompleted(el) {
  let elem = document.getElementById(el);
  let changeInfo = $(elem).find('.ba-task__timeline');
  if (elem.parentElement.id == "div3") {
    $(changeInfo).html("<span class='icon-time'></span> 7 days left");
    $(changeInfo).removeClass('ba-task__timeline_done');
  }
}

function toCompleted(el) {
  let elem = document.getElementById(el);
  let changeInfo = $(elem).find('.ba-task__timeline');
  $(changeInfo).html("<span class='icon-checked'></span> Completed!");
  $(changeInfo).addClass('ba-task__timeline_done');
  $(changeInfo).removeClass('ba-task__timeline_delay');
}

//======= end workflow drag & drop =======//