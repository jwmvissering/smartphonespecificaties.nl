<?php
include 'db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
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

else if ($method == 'POST') {


}

else if ($method == 'PUT') {
	
	$rest_json = file_get_contents("php://input");
	$_PUT = json_decode($rest_json, true);
	$aanpassingsid = $_PUT['aanpassingsid'];
	$smartphoneid = $_PUT['smartphoneid'];
	
	$query =  "SELECT * FROM aanpassingen WHERE id='" . $aanpassingsid . "'";
	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
	
	$row= mysqli_fetch_assoc($result);
	
	$query2 =  "UPDATE smartphones SET introductie='" . $row['introductie'] . "', afbeelding='" . $row['afbeelding'] . "', model='" . $row['model'] . "',
	afmetingen='" . $row['afmetingen'] . "', gewicht='" . $row['gewicht'] . "', processor='" . $row['processor'] . "', interneopslag='" . $row['interneopslag'] . "',
	uitbreidinggeheugen='" . $row['uitbreidinggeheugen'] . "', netwerk='" . $row['netwerk'] . "', bluetooth='" . $row['bluetooth'] . "', nfc='" . $row['nfc'] . "',
	usb='" . $row['usb'] . "', simkaart='" . $row['simkaart'] . "', resolutie='" . $row['resolutie'] . "', schermformaat='" . $row['schermformaat'] . "',
	camera='" . $row['camera'] . "', videoresolutie='" . $row['videoresolutie'] . "', frontcamera='" . $row['frontcamera'] . "', batterij='" . $row['batterij'] . "',
	besturingssysteem='" . $row['besturingssysteem'] . "', bevestigd='" . $row['bevestigd'] . "'
	WHERE id='" . $smartphoneid . "'";
	
	if ($conn->query($query2) === TRUE) {
		
		$query3 =  "DELETE FROM aanpassingen WHERE id='" . $aanpassingsid . "'";
			
			if ($conn->query($query3) === TRUE) {
				$uitkomst = "Success";
			} else {
				$uitkomst = "Aanpassing kon niet verwijderd worden uit de database.";
			}
	} else {
		$uitkomst = "Error";
	}
}

else if ($method == 'DELETE') {
	$rest_json = file_get_contents("php://input");
	$_DELETE = json_decode($rest_json, true);
	
	
	$query = "DELETE FROM aanpassingen WHERE id=" . intval($_DELETE['id']);

	if ($conn->query($query) === TRUE) {
    $uitkomst = "Success";
	} else {
		$uitkomst = "Error";
	}
}

if (!isset($uitkomst)){
	$uitkomst = "Leeg";
}

else{
header('Content-type: application/json');
echo json_encode($uitkomst, JSON_PRETTY_PRINT);
}
?>