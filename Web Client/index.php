<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="img/favicon.ico">
    <title>news.dash</title>

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <!-- Bootstrap theme -->
    <link href="css/bootstrap-theme.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <!--<link href="theme.css" rel="stylesheet">
-->
    <!-- JQuery -->
	<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <!--<script src="js/jquery-2.0.3.min.js"></script>
    <script src="js/jquery-migrate-1.2.1.min.js"></script>
-->

<script src="controller.js"></script>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="../../assets/js/html5shiv.js"></script>
      <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

	  <script>
	  function showLower(topic) {
	  //alert(topic);
		var h = document.documentElement.scrollHeight;
		var offset = $(".lower_view").offset().top + 15;
		var new_h = h - offset;
		//alert();
		$("#article_tooltip").hide();
		$("#left").show(1000);
		$("#right").show(1000);
		
		buildHeadlines(topics[topic].stories);
		$(".lower_view").height(0);
		$(".lower_view").animate({
			height: (h - offset) + "px"
		}, 500 ); // how long the animation should 
		//alert(topics[topic].stories.length);
	  };
	  
	  // function loadArticles() {
		// $.ajax({
		  // url: "#",
		  // success: function() {
			
			//$(".lower_view").load('controller.html');
			//$(".lower_view").html('<object data="controller.html">');
		  // }
		// });
	  // };
	  </script>
	  
    <!-- Fixed navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          
		  <img style="padding:5px" src="img/logo_white.svg" height="100%"/>
		  
        </div>
        <!--<div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container theme-showcase">

      <!-- Main jumbotron for a primary marketing message or call to action -->
      <div class="jumbotron" >
		<?php include('canvas.php'); ?>
        <!--<h1>News in a dash!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        <p><a class="btn btn-primary btn-lg">Learn more &raquo;</a></p>-->
      </div>
	  <div class="lower_view" >
		<div id="article_tooltip">Choose a topic to view articles</div>
		<div id="left">
		</div>

		<div id="right">

			<div id="previewbox">
			</div>

		</div>
	  </div>



    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!--<script src="../../assets/js/jquery.js"></script>
    <script src="../../dist/js/bootstrap.min.js"></script>
    <script src="../../assets/js/holder.js"></script>-->
	

  </body>
</html>
