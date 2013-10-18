<?php

$nodes[5];
$links[4];

for($i=0;$i<5;$i++){
	$currentStory = $i +1;
	$temparray = array(
            "name" => "Story $currentStory",
            "full_name" => "Story $currentStory",
           	"type" => 1,
           	"slug" => "www.bbc.co.uk",
           	"entity" => "story",
           	"img_hrefD" => "",
           	"img_hrefL" => "" 
           	);

$nodes[$i] = $temparray;
}

for($j=0;$j<4;$j++){
	$temparray = array(
            "source" => $j,
            "target" => $j+1,
            "value" => 1,
            "distance" => 5
        );

$links[$j] = $temparray;
}

$jsonArray = array(
    "nodes" => $nodes,
    "links" => $links
);

echo json_encode($jsonArray);

?>

