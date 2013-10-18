<!DOCTYPE html>
<meta charset="utf-8">
<style>

body {
}

#left {
	width: 50%;
	display: block;
	float: left;
}

#right {
	width: 50%;
	display: block;
	float: right;
}

.headline {
	height: 40px;
	font-size: 14pt;
	padding-left: 10px;
	line-height: 40px;
	border: 1px solid #C0C0C0;
	background-color: #EFEFEF;
	margin: 2px;
	border-radius: 10px;
}

.headline:hover {
	cursor: hand;
}

</style>

<body>

<div id="left">

</div>

<div id="right">

	<div id="previewbox" class="headline" style="height: 500px">test!</div>

</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script>

<script>

$(function(){

//$.getJSON( "sections.json", function( data ) {
$.getJSON( "Headlines.html", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<div class='headline' id='" + val['headline'] + "'>" + val['headline'] + "</div>" );
  });
 
  $( "<div/>", {
    "class": "headlineset",
    html: items.join( "" )
  }).appendTo( "#left" );
});


$("headline").click(function() {
	alert("test");
});
	
});

</script>