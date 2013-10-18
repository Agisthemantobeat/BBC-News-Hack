<?php

$nodes[5];
$links[4];
$value =10;
$entity = "story";

for($i=0;$i<5;$i++){
	$currentStory = $i +1;


	if($entity=="story"){
		$entity="event";
	}else{
		$entity="story";
	}

	$temparray = array(
            "name" => "Story $currentStory",
            "full_name" => "Story $currentStory",
           	"type" => 1,
           	"slug" => "www.bbc.co.uk",
           	"entity" => $entity,
           	"img_hrefD" => "",
           	"img_hrefL" => "" 
           	);

$nodes[$i] = $temparray;
}

for($j=0;$j<4;$j++){
	if($value==10){
		$value=1;
	}
	else{
		$value=10;
	}

	$temparray = array(
            "source" => $j,
            "target" => $j+1,
            "value" => $value,
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

