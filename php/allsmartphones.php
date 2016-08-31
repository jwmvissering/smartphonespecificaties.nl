<?php
include 'db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}



if(isset($_GET['merk'])){
	$query = "SELECT id, model FROM smartphones WHERE merk = " . $_GET['merk'];
	
	//$query2 = "SELECT * FROM smartphones";
	
	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
	
	while ($smartphones = mysqli_fetch_assoc($result)) {
		$uitkomst[] = $smartphones;
	} 	
}


else{
$query = "SELECT * FROM merken WHERE goedgekeurd = 'V'";

//$query2 = "SELECT * FROM smartphones";

$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

while ($allemerken = mysqli_fetch_assoc($result)) {
	$uitkomst[] = $allemerken;
} 
 
}
header('Content-type: application/json');
echo json_encode($uitkomst, JSON_PRETTY_PRINT);

?>