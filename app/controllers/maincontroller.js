app.controller('mainController', ['$scope', 'mainFactory', '$timeout', '$state', '$rootScope', '$anchorScroll',
	function($scope, mainFactory, $timeout, $state, $rootScope, $anchorScroll) {

		var above;
		var merkid;
		var merknaam;
		var modelid;
		var modelnaam;
		var phoneimg;
		var phoneid;
		var nfc = "X";
		var bevestigd = "X";
		var uitbreidinggeheugen = "X";
		$scope.feedback = false;
		$scope.showTable = true;
		$scope.showPencil = true;

		$scope.init = function() {
			$rootScope.homeclass = "active";
			$rootScope.vergelijkenclass = "";
			$rootScope.toevoegenclass = "";
			$rootScope.apiclass = "";
			$rootScope.beheerclass = "";
			
			$scope.showSmartphoneSelect = false;

			mainFactory.getSmartphones().then(function(response) {
				$scope.merken = response.data;
			});
		};

		$scope.changeMerk = function() {
			//console.log('Merk changed');
			$scope.showSmartphoneSelect = true;
			merkid = $scope.selectedMerk.id;
			merknaam = $scope.selectedMerk.naam;

			mainFactory.getSmartphones($scope.selectedMerk.id).then(function(response) {
				$scope.smartphones = response.data;
			});

			$scope.showSpecs = false;
		};


		$scope.changeSmartphone = function() {
			$scope.showTable = true;
			$scope.showEditableTable = false;
			$scope.feedback = false;
			$scope.showPencil = true;

			document.getElementById("selectboxes").style.margin = "30px auto";

			// als de functie wordt aangeroepen maar er nog geen smartphone geselecteerd is moet hij nog niet de factory uitvoeren.
			if ($scope.selectedSmartphone) {

				mainFactory.getSpecifications($scope.selectedSmartphone.id).then(function(response) {
					$scope.specificaties = response.data;
					phoneimg = response.data[0].afbeelding;
					phoneid = response.data[0].id;
				});
				modelid = $scope.selectedSmartphone.id;
				modelnaam = $scope.selectedSmartphone.model;
				
				// Als de selectboxes boven in beeld staan, voer dan geen delay uit op de ng-show
				if (above === true) {
					$scope.showSpecs = true;
				} else {
					$timeout(function() {
						$scope.showSpecs = true;
					}, 600);
				}

				above = true;
			}
		
		};

		$scope.goVergelijken = function() {
			$rootScope.rootmerkid = merkid;
			$rootScope.rootmodelid = modelid;
			$rootScope.rootmerk = $scope.selectedMerk.naam;
			$rootScope.rootmodel = $scope.selectedSmartphone.model;
			$state.go('vergelijken');
		};
		
		
	
		$scope.editButton = function() {
			$scope.showTable = $scope.showTable === false ? true: false;
			$scope.showEditableTable = $scope.showEditableTable === true ? false: true;
			
			if($scope.showEditableTable){
				console.log('set: ' + $scope.selectedSmartphone.model);
				$scope.editmodel = $scope.selectedSmartphone.model;
				$scope.editintroductie = $scope.specificaties[0].introductie;
				$scope.editafmetingen = $scope.specificaties[0].afmetingen;
				$scope.editgewicht = $scope.specificaties[0].gewicht;
				$scope.editbesturingssysteem = $scope.specificaties[0].besturingssysteem;
				$scope.editprocessor = $scope.specificaties[0].processor;
				$scope.editinterneopslag = $scope.specificaties[0].interneopslag;
				//$scope.editcheckuitbreidinggeheugen = $scope.specificaties[0].interneopslag;
				if($scope.specificaties[0].uitbreidinggeheugen === "X"){
					$scope.edituitbreidinggeheugen = "";
				}
				else{
				$scope.edituitbreidinggeheugen = $scope.specificaties[0].uitbreidinggeheugen;
				$scope.editcheckuitbreidbaargeheugen = true;
				}
				$scope.editnetwerk = $scope.specificaties[0].netwerk;
				$scope.editbluetooth = $scope.specificaties[0].bluetooth;
				
				if($scope.specificaties[0].nfc === "V"){
					$scope.editnfc = true;
				}
				
				$scope.editusb = $scope.specificaties[0].usb;
				$scope.editsimkaart = $scope.specificaties[0].simkaart;
				$scope.editschermformaat = $scope.specificaties[0].schermformaat;
				$scope.editresolutie = $scope.specificaties[0].resolutie;
				$scope.editcamera = $scope.specificaties[0].camera;
				$scope.editvideoresolutie = $scope.specificaties[0].videoresolutie;
				$scope.editfrontcamera = $scope.specificaties[0].frontcamera;
				$scope.editbatterij = $scope.specificaties[0].batterij;
				$scope.editbevestigd = $scope.specificaties[0].bevestigd;
			}
			
		};
		
		$scope.submitEdit = function() {
			console.log($scope.edituitbreidinggeheugen);
			
			if($scope.editcheckuitbreidbaargeheugen === true){
						//console.log($scope.edituitbreidinggeheugen);
						uitbreidinggeheugen = $scope.edituitbreidinggeheugen;
			}
			
			if($scope.editnfc === true){
						//console.log($scope.edituitbreidinggeheugen);
						nfc = 'V';
			}
			
			if($scope.editbevestigd === true){
						//console.log($scope.edituitbreidinggeheugen);
						bevestigd = 'V';
			}
                        			
			//$scope.editmodel = "test";
			console.log('verstuur ' + $scope.editmodel);
			var editInputFields = [];
			editInputFields.push(/* 0 */merkid, /* 1 */$scope.editmodel, /* 2 */$scope.editintroductie, /* 3 */$scope.editafmetingen, /* 4 */$scope.editgewicht, /* 5 */$scope.editbesturingssysteem,
								 /* 6 */$scope.editprocessor, /* 7 */$scope.editinterneopslag, /* 8 */uitbreidinggeheugen, /* 9 */$scope.editnetwerk, /* 10 */$scope.editbluetooth,
								 /* 11 */$scope.editusb, /* 12 */$scope.editsimkaart, /* 13 */$scope.editschermformaat, /* 14 */$scope.editresolutie, /* 15 */$scope.editcamera,
								 /* 16 */$scope.editvideoresolutie, /* 17 */$scope.editfrontcamera, /* 18 */$scope.editbatterij, /* 19 */bevestigd, /* 20 */ modelnaam,
								 /* 21 */ phoneimg, /* 22 */ phoneid, /* 23 */ nfc);
			
			mainFactory.postEditForm(editInputFields).then(function(response) {
				$scope.feedback = true;
				$scope.showEditableTable = false;
				$anchorScroll();
				if(response.data === "Toegevoegd"){
					$scope.feedbackmelding = "De gegevens zijn succesvol verzonden. Na goedkeuring van de webmaster zullen de wijzigingen zichtbaar zijn.";
				}
				else if(response.data === "Error"){
					$scope.feedbackmelding = "Error. De gegevens konden niet verzonden worden.";
				}
			});
			
			$scope.showPencil = false;
		};

		
		
	
	}]); //mainController