<?php
include '../php/db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}

	$query = "SELECT * FROM smartphones";
	
	//$query2 = "SELECT * FROM smartphones";
	
	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
	
	while ($smartphones = mysqli_fetch_assoc($result)) {
		$uitkomst[] = $smartphones;
	} 	


header('Content-type: application/json');
echo json_encode($uitkomst, JSON_PRETTY_PRINT);

?>