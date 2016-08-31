<?php
include 'db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$files = $_POST['files'];

$sql = "INSERT INTO aanpassingen (smartphoneid, introductie, afbeelding, merk, origineelmodel, model, afmetingen, gewicht, processor, interneopslag,
		uitbreidinggeheugen, netwerk, bluetooth, nfc, usb, simkaart, resolutie,
		schermformaat, camera, videoresolutie, frontcamera, batterij, besturingssysteem, bevestigd)
		VALUES ('" . $files[22] . "','" . $files[2] . "', '" . $files[21] . "','" . $files[0] . "','" . $files[20] . "','" . $files[1] . "','" . $files[3] . "','" . $files[4] . "','" . $files[6] . "','" . $files[7] . "',
		'" . $files[8] . "','" . $files[9] . "','" . $files[10] . "','" . $files[23] . "','" . $files[11] . "','" . $files[12] . "','" . $files[14] . "',
		'" . $files[13] . "','" . $files[15] . "','" . $files[16] . "','" . $files[17] . "','" . $files[18] . "','" . $files[5] . "','" . $files[19] . "')";

if (mysqli_query($conn, $sql)) {
    echo "Toegevoegd";
} else {
    echo "Error";
}