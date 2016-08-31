<?php
include 'db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}


$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $query =    "SELECT nieuw.id, nieuw.datumtoevoeging, nieuw.introductie, nieuw.afbeelding,
			nieuw.model, nieuw.afmetingen, nieuw.gewicht, nieuw.processor, nieuw.interneopslag,
			nieuw.uitbreidinggeheugen, nieuw.netwerk, nieuw.bluetooth, nieuw.nfc, nieuw.usb, nieuw.simkaart,
			nieuw.resolutie, nieuw.schermformaat, nieuw.camera, nieuw.videoresolutie, nieuw.frontcamera, nieuw.batterij,
			nieuw.besturingssysteem, nieuw.bevestigd, merken.naam
			FROM nieuw
			JOIN merken ON nieuw.merk=merken.id";
	
	//$query2 = "SELECT * FROM smartphones";
	
	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
	
	while ($nieuw = mysqli_fetch_assoc($result)) {
		$uitkomst[] = $nieuw;
	}
}
else if ($method == 'PUT') {
	
	$rest_json = file_get_contents("php://input");
	$_PUT = json_decode($rest_json, true);
	$nieuwetelefoonid = $_PUT['toevoegingsid'];
	
	$query =  "SELECT * FROM nieuw WHERE id='" . $nieuwetelefoonid . "'";
	$result = mysqli_query($conn, $query) or die(mysqli_error($conn));
	
	$row= mysqli_fetch_assoc($result);
	
	$query2 =  "INSERT INTO smartphones (introductie,afbeelding,merk,model,afmetingen,gewicht,processor,interneopslag,uitbreidinggeheugen,netwerk,bluetooth,nfc,
	usb,simkaart,resolutie,schermformaat,camera,videoresolutie,frontcamera,batterij,besturingssysteem,bevestigd) VALUES ('" . $row['introductie'] . "', '" . $row['afbeelding'] . "',
	'" . $row['merk'] . "', '" . $row['model'] . "', '" . $row['afmetingen'] . "', '" . $row['gewicht'] . "', '" . $row['processor'] . "', '" . $row['interneopslag'] . "',
	'" . $row['uitbreidinggeheugen'] . "', '" . $row['netwerk'] . "', '" . $row['bluetooth'] . "', '" . $row['nfc'] . "',
	'" . $row['usb'] . "', '" . $row['simkaart'] . "', '" . $row['resolutie'] . "', '" . $row['schermformaat'] . "',
	'" . $row['camera'] . "', '" . $row['videoresolutie'] . "', '" . $row['frontcamera'] . "', '" . $row['batterij'] . "',
	'" . $row['besturingssysteem'] . "', '" . $row['bevestigd'] . "')";
	
	if ($conn->query($query2) === TRUE) {
		
		$query3 =  "DELETE FROM nieuw WHERE id='" . $nieuwetelefoonid . "'";
		$query4 =  "UPDATE merken SET goedgekeurd = 'V' WHERE id='" . $row['merk'] . "'";
			
			if ($conn->query($query3) === TRUE) {
				if ($conn->query($query4) === TRUE) {
					$uitkomst = "Success";
				}
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
	
	
	$query = "DELETE FROM nieuw WHERE id=" . intval($_DELETE['id']);

	if ($conn->query($query) === TRUE) {
    $uitkomst = "Success";
	} else {
		$uitkomst = "Error";
	}
}

header('Content-type: application/json');

if (!isset($uitkomst)){
	$uitkomst = "Leeg";
}

else{
	echo json_encode($uitkomst, JSON_PRETTY_PRINT);
}

?>