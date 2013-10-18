<?php

ini_set('display_errors', 0);	// hide warnings in PHP

$url = $_GET['url'];

//echo $url.;
//exit;

//echo $url;

$q = $url;

if(isset($_GET['limit'])) {
	$limit = $_GET['limit'];
	$q = $q."&limit=".$limit;
}

//echo '<br/>'.$q;

if(isset($_GET['where'])) {
	$where = $_GET['where'];
	$q = $q."&where=".$where;
}

//echo '<br/>'.$q;

if(isset($_GET['api_key'])) {
	$api_key = $_GET['api_key'];
	$q = $q."&api_key=".$api_key;
}

//echo '<br/>'.$q;

$newthing = str_replace(" ", "%20", $q);

//echo '<br/>'.$newthing;
//exit;


//echo $q;
//echo $_GET['api_key'];
//exit;

//echo $q;

//echo "url=".file_get_contents($url);
//exit;

// Create a stream
$opts = array(
  'http'=>array(
    'method'=>"GET",
    'header'=> "X-Candy-Platform: Desktop\r\n" .
    			"X-Candy-Audience: Domestic\r\n".
    			"Accept: application/json\r\n"
  )
);

$context = stream_context_create($opts);

// Open the file using the HTTP headers set above
$file = file_get_contents($newthing, false, $context);

$array = json_decode($file);
echo json_encode($array);

?>