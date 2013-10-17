window.onload=function(){
	/*
var data = {"nodes":[
							{"name":"Story 1", "full_name":"Story 1", "type":1, "slug": "www.yahoo.com", "entity":"story", "img_hrefD":"", "img_hrefL":""},
							{"name":"GGL", "full_name":"Story 2", "type":2, "slug": "www.google.com", "entity":"story", "img_hrefD":"", "img_hrefL":""},
							{"name":"BNG", "full_name":"Story 3", "type":2, "slug": "www.bing.com", "entity":"story", "img_hrefD":"", "img_hrefL":""},
							{"name":"YDX", "full_name":"Story 4", "type":2, "slug": "www.yandex.com", "entity":"story", "img_hrefD":"", "img_hrefL":""},
							
							
							{"name":"YHO", "full_name":"Story 5", "type":1, "slug": "www.yahoo.com", "entity":"event", "img_hrefD":"", "img_hrefL":""},
							{"name":"GGL", "full_name":"Story 6", "type":2, "slug": "www.google.com", "entity":"event", "img_hrefD":"", "img_hrefL":""},
							{"name":"BNG", "full_name":"Story 7", "type":2, "slug": "www.bing.com", "entity":"event", "img_hrefD":"", "img_hrefL":""},
							{"name":"YDX", "full_name":"Story 8 ", "type":2, "slug": "www.yandex.com", "entity":"event", "img_hrefD":"", "img_hrefL":""},
							{"name":"YDX", "full_name":"Story 9", "type":2, "slug": "www.yandex.com", "entity":"story", "img_hrefD":"", "img_hrefL":""},
						], 
				"links":[
							{"source":0,"target":1,"value":1,"distance":5},
							{"source":1,"target":2,"value":1,"distance":5},
							{"source":2,"target":3,"value":1,"distance":5},
							
							
							{"source":3,"target":4,"value":10,"distance":6},
							{"source":4,"target":5,"value":10,"distance":6},
							{"source":5,"target":6,"value":10,"distance":6},
							{"source":6,"target":7,"value":10,"distance":6},
							{"source":7,"target":8,"value":10,"distance":6},							]
				   }    
				   */

$.getJSON( "data.json", function( data ) {

proc(data);

});


function proc(data)
{

		var w = 540,
			h = 500,
			radius = d3.scale.log().domain([0, 312000]).range(["10", "50"]);
		
		var vis = d3.select("body").append("svg:svg")
			.attr("width", w)
			.attr("height", h);
			
			//vis.append("defs").append("marker")
			//.attr("id", "arrowhead")
			//.attr("refX", 22 + 3) /*must be smarter way to calculate shift*/
			//.attr("refY", 2)
			//.attr("markerWidth", 6)
			//.attr("markerHeight", 4)
			//.attr("orient", "auto")
			//.append("path")
				//.attr("d", "M 0,0 V 4 L6,2 Z"); //this is actual shape for arrowhead
		
	//	d3.json("data.json", function(error, data) {
	//	});
	    
			var force = self.force = d3.layout.force()
				.nodes(data.nodes)
				.links(data.links)
				.linkDistance(function(d) { return (d.distance*10); })
				//.friction(0.7)
				.charge(-1200)
				.size([w, h])
				.start();
		
		
			var link = vis.selectAll("line.link")
				.data(data.links)
				.enter().append("svg:line")
				.attr("class", function (d) { return "link" + d.value +""; })
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; })
				.attr("marker-end", function(d) {
													if (d.value == 1) {return "url(#arrowhead)"}
													else    { return " " }
												;});
				
			function openLink() {
				return function(d) {
					var url = "";
					if(d.slug != "") {
						url = d.slug
					} //else if(d.type == 2) {
						//url = "clients/" + d.slug
					//} else if(d.type == 3) {
						//url = "agencies/" + d.slug
					//}
					window.open("//"+url)
				}
			}
					
		
			var node = vis.selectAll("g.node")
				.data(data.nodes)
			  .enter().append("svg:g")
				.attr("class", "node")
				.call(force.drag);
		
			
			node.append("circle")
			  	.attr("class", function(d){ return "node type"+d.type})
				.attr("r",function(d){ return 18 })
				//.on("mouseover", expandNode);
				//.style("fill", function(d) { return fill(d.type); })
				
						
		
			node.append("svg:image")
				.attr("class", function(d){ return "circle img_"+d.name })
				.attr("xlink:href", function(d){ return d.img_hrefD})
				.attr("x", "-36px")
				.attr("y", "-36px")
				.attr("width", "70px")
				.attr("height", "70px")
				.on("click", openLink())
				.on("mouseover", function (d) { if(d.entity == "story")
													{
    					d3.select(this).attr("width", "90px")
					   					.attr("x", "-46px")
										.attr("y", "-36.5px")
									   .attr("xlink:href", function(d){ return d.img_hrefL});							
													}
					})
				.on("mouseout", function (d) { if(d.entity == "story")
												{
    					d3.select(this).attr("width", "70px")
										.attr("x", "-36px")
										.attr("y", "-36px")
									   .attr("xlink:href", function(d){ return d.img_hrefD});
												}
					});    
					
		
			node.append("svg:text")
				.attr("class", function(d){ return "nodetext title_"+d.name })
				.attr("dx", 0)
				.attr("dy", ".35em")
				.style("font-size","10px")
				.attr("text-anchor", "middle")
				.style("fill", "white")
				.text(function(d) { return d.name} );

            node.append("svg:text")
				.attr("class", function(d){ return "nodetext title_"+d.name })
				.attr("dx", "-4em")
				.attr("dy", ".35em")
				.style("font-size","10px")
				.attr("text-anchor", "right")
				.style("fill", "black")
				;
				
				
			node.on("mouseover", function (d) {
            	if (d.entity == "story"){   
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.text(function(d){
								return d.full_name;
							})
						.style("font-size","15px")
						
				}
				else if(d.entity == "event"){
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.text(function(d){return d.full_name})
						.style("font-size","15px")	
					
				}
				else {
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.style("font-size","15px")
				}
						
		    	if (d.entity == "story") {
					d3.select(this).select('image')
						.attr("width", "90px")
						.attr("x", "-46px")
						.attr("y", "-36.5px")
						.attr("xlink:href", function (d) {
							return d.img_hrefL
		            		});               
		        }
				
				if (d.entity == "story") {
				
					d3.select(this).select('circle')
									.transition()
									.duration(300)
									.attr("r",28)
									
				}
				else if (d.entity == "event"){
					d3.select(this).select('circle')
									.transition()
									.duration(300)
									.attr("r",32)
				}
		 	})
			
			 
			 node.on("mouseout", function (d) {
				if (d.entity == "story") {
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.text(function(d){return d.name;})
						.style("font-size","10px")
					}
				else if(d.entity == "event"){
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.text(function(d){return d.name;})
						.style("font-size","10px")	
					
				}
				else {
					d3.select(this).select('text')
						.transition()
						.duration(300)
						.style("font-size","10px")
				}
						
					
				 if (d.entity == "story") {
					d3.select(this).select('image')
						.attr("width", "70px")
						.attr("x", "-36px")
						.attr("y", "-36px")
						.attr("xlink:href", function (d) {
						return d.img_hrefD
					});
				}
				
				if (d.entity == "story" || d.entity == "event") {
				
					d3.select(this).select('circle')
									.transition()
									.duration(300)
									.attr("r",18)
				}
				
			});
		
			force.on("tick", function() {
			  link.attr("x1", function(d) { return d.source.x; })
				  .attr("y1", function(d) { return d.source.y; })
				  .attr("x2", function(d) { return d.target.x; })
				  .attr("y2", function(d) { return d.target.y; });
		
			  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			});
		//});
		
}//]]>  

};
