<?php
include 'db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if(isset($_GET['merk'])){
	$query = "SELECT id, model FROM smartphones WHERE merk = " . $_GET['merk'];
	
	//$query2 = "SELECT * FROM smartphones";
	
	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
	
	while ($smartphones = mysqli_fetch_assoc($result)) {
		$uitkomst[] = $smartphones;
	} 	
}

else if(isset($_POST['id'])){
//    $query = "DELETE FROM aanpassingen WHERE id='" . $data['id'] . "';
//	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
	$uitkomst = intval($_POST['id']);
}



else{
	$query =    "SELECT aanpassingen.id, aanpassingen.smartphoneid, aanpassingen.datumtoevoeging, aanpassingen.introductie, aanpassingen.afbeelding,
				aanpassingen.origineelmodel, aanpassingen.model, aanpassingen.afmetingen, aanpassingen.gewicht, aanpassingen.processor, aanpassingen.interneopslag,
				aanpassingen. uitbreidinggeheugen, aanpassingen.netwerk, aanpassingen.bluetooth, aanpassingen.nfc, aanpassingen.usb, aanpassingen.simkaart,
				aanpassingen.resolutie, aanpassingen.schermformaat, aanpassingen.camera, aanpassingen.videoresolutie, aanpassingen.frontcamera, aanpassingen.batterij,
				aanpassingen.besturingssysteem, aanpassingen.bevestigd, merken.naam
				FROM aanpassingen
				JOIN merken ON aanpassingen.merk=merken.id";
	
	//$query2 = "SELECT * FROM smartphones";
	
	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
	
	while ($aanpassingen = mysqli_fetch_assoc($result)) {
		$uitkomst[] = $aanpassingen;
	} 
}

header('Content-type: application/json');
echo json_encode($uitkomst, JSON_PRETTY_PRINT);

?>