<?php
include 'db_connect.inc.php';
if (!$conn){
	echo "misgelukt";
}
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


$query = "SELECT * FROM users WHERE email = '" . $_POST['email'] . "' AND wachtwoord = '" . $_POST['wachtwoord'] . "'";

$result = mysqli_query($conn, $query) or die(mysqli_error($conn));

//echo mysqli_num_rows($result);
$rows = mysqli_num_rows($result);

if ($rows === 0 || $rows === ""){
	echo "Failed";
	//header('HTTP/1.0 401 Unauthorized');
    exit;
}

else if ($rows === 1){
	setcookie("Login", "2be05fa06d70a51135a6c2caba7f0047", time()+86400, "/","", 0); /* Cookie van 1 dag */
	setcookie("Naam", "Jamon", time()+86400, "/","", 0); /* Cookie van 1 dag */
	echo "Success";
	exit;
}

else{
	echo "Failed";
	//header('HTTP/1.0 401 Unauthorized');
    exit;
}


?>