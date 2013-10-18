<?php

$myjson = file_get_contents("sections.json");
$myarray = json_decode($myjson);

foreach($myarray as $category) {
	
		$mydaily = rand(40,100);
		$myrecent = rand(10,40);
			
		$cat = array(
						'category'	=>	$category->category,
						'id'		=>	$category->sectionId,
						'daily'		=>	$mydaily,
						'recent'	=>	$myrecent
					);
	
		$catsarray [] = $cat;

}

echo json_encode($catsarray);

?>