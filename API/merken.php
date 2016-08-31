<?php
include '../php/db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}

$query = "SELECT id, naam AS merk FROM merken WHERE goedgekeurd = 'V'";

//$query2 = "SELECT * FROM smartphones";

$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

while ($allemerken = mysqli_fetch_assoc($result)) {
	$uitkomst[] = $allemerken;
} 


header('Content-type: application/json');
echo json_encode($uitkomst, JSON_PRETTY_PRINT);

?>