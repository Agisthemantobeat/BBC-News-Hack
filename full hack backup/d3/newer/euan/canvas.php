<!DOCTYPE html>
<meta charset="utf-8">
<style>

body {
  font: 10pt Verdana;
  background-color: #FFFFFF;
  margin: 0 auto;
}

#container {
	width: 60%;
	margin: 0 auto;
}

svg {
  padding: 10px 0 0 50px;
}

.arc {
  stroke: none;
}

</style>
<body>

<div id="container">

</div>
	<script src="http://d3js.org/d3.v3.min.js"></script>
<script>

var radius = 40,
    padding = 10;

var color = d3.scale.ordinal()
    .range(["#BFCCDE", "#8a89a6"]);

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 10);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

d3.json("showjson.php", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "category" && key !== "id"; }));

  data.forEach(function(d) {
    d.ages = color.domain().map(function(name) {
      return {name: name, population: +d[name]};
    });
  });



  var svg = d3.select("#container").selectAll(".pie")
      .data(data)
    .enter().append("svg")
      .attr("class", "pie")
      .attr("width", radius * 3)
      .attr("height", radius * 3)
    .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

  svg.selectAll(".arc")
      .data(function(d) { return pie(d.ages); })
    .enter().append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

  svg.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.recent; });
      
  svg.append("text")
      .attr("dy", "4.5em")
      .style("text-anchor", "middle", "top: 3em", "word-wrap")
      .text(function(d) { return d.category; });
      
  // DON'T KNOW HOW TO SELECT THE INDIVIDUAL ELEMENTS RATHER THAN THEM ALL
  
  svg.on("mouseover", function(d) {
  	//alert(d.category);
  });
  
  svg.on("click", function(d) {
  	alert("clicked!");
  });

});

</script>