
<style>

#arc_container {
	width: 100%;
	margin: 0 auto;
  font: 10pt Verdana;
  background-color: #FFFFFF;
}

.numeric_text {
	font: 14pt Verdana;
}


svg {
  padding: 10px 0 0 50px;
  width:auto;
  height:auto;
}

.svg_wrapper {
	
	height:auto;
	width:auto;
	font: 10pt Verdana;
    display:inline-block;
	
}

#arc_container a:hover {
	text-decoration:none;
	font-weight:bold;
}

#arc_container {
	background-color:inherit;
	padding-top:10px;
    text-align:center;
    display:inline-block;
	margin-left:auto;
	margin-right:auto;
    width:100%;
}


.arc {

  stroke: none;
}

</style>
	<div id="arc_container">

	</div>
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script>

  var selections = [];
var radius = 40,
    padding = 10;

var color = d3.scale.ordinal()
    .range(["#606060", "#B0B0B0"]);

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



  var svg = d3.select("#arc_container").selectAll(".pie")
      .data(data)
    .enter().append("svg")
      .attr("class", "pie")
      .attr("width", radius * 2)
      .attr("height", radius * 3)
    .append("g")
	  .attr("margin-left", "auto")
	  .attr("margin-right", "auto")
      .attr("transform", "translate(" + radius + "," + radius + ")");

	
  svg.selectAll(".arc")
      .data(function(d) { return pie(d.ages); })
    .enter().append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.name); });

  svg.append("text")
      .attr("dy", ".35em")
	  .attr("class", "numeric_text")
      .style("text-anchor", "middle")
      .text(function(d) { return d.recent; });
      
	//var id = (function(d) { return d.sectionId; }).toString();
	
  svg.append("text")
      .attr("dy", "4.5em")
	  .attr("class", "item_text")
      .style("text-anchor", "middle", "top: 3em", "word-wrap")
      .text(function(d) { return d.category; });
      
  
	$(document).ready(function() {
		d3.selectAll("text").each(function(selection) {
			selections.push(selection);
		});
		
		var i = 0;
		$("svg").each(function(outer) {
			
			$(this).find("g").find("text").each(function(inner) {
				if (i % 2 == 0) {
					$(this).parent().parent().wrap("<a style='cursor:pointer;width:inherit;height:inherit;' onclick='showLower();' ></a>");
				}
				i++;
			});
		});			
	});
  

	
});

</script>