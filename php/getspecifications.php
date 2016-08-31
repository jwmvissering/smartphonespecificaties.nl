<?php
include 'db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}

$query = "SELECT * FROM smartphones WHERE id = " . $_GET['model'];

//$query2 = "SELECT * FROM smartphones";

$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

while ($allespecificaties = mysqli_fetch_assoc($result)) {
	$uitkomst[] = $allespecificaties;
} 
 

header('Content-type: application/json');
echo json_encode($uitkomst, JSON_PRETTY_PRINT);

?>