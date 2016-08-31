<?php
include 'db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {

	$rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true);
	$files = $_POST['files'];
	
	//echo $files[0];
	//$afbeelding = "noimage.png";
	$bevestigd = "V";
	
	$sql = "INSERT INTO nieuw (introductie, afbeelding, merk, model, afmetingen, gewicht, processor, interneopslag,
			uitbreidinggeheugen, netwerk, bluetooth, nfc, usb, simkaart, resolutie,
			schermformaat, camera, videoresolutie, frontcamera, batterij, besturingssysteem, bevestigd)
			VALUES ('" . $files[2] . "', '" . $files[20] . "','" . $files[0] . "','" . $files[1] . "','" . $files[3] . "','" . $files[4] . "','" . $files[6] . "','" . $files[7] . "',
			'" . $files[8] . "','" . $files[9] . "','" . $files[10] . "','" . $files[21] . "','" . $files[11] . "','" . $files[12] . "','" . $files[14] . "',
			'" . $files[13] . "','" . $files[15] . "','" . $files[16] . "','" . $files[17] . "','" . $files[18] . "','" . $files[5] . "','" . $files[19] . "')";
	
	if (mysqli_query($conn, $sql)) {
		echo "Toegevoegd";
	} else {
		echo "Error";
	}
	
}

if ($method == 'PUT') {

	$rest_json = file_get_contents("php://input");
	$_PUT = json_decode($rest_json, true);
	$merk = $_PUT['merk'];
	
	$sql = "INSERT INTO merken (naam, goedgekeurd)
			VALUES ('" . $merk['naam'] . "', 'X')";
	
	if (mysqli_query($conn, $sql)) {
		$success = 1;			
	} else {
		echo "Error";
	}
	
	if($success == 1){
		$sql2 = "SELECT id FROM merken WHERE naam = '" . $merk['naam'] . "'";
		
		$result = mysqli_query($conn, $sql2) or die(mysqli_error($conn));
		
		while ($merkid = mysqli_fetch_assoc($result)) {
			$uitkomst[] = $merkid;
		}
		
		header('Content-type: application/json');
		echo json_encode($uitkomst[0], JSON_PRETTY_PRINT);
	}
	
}
