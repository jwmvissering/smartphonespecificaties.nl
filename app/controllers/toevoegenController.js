app.controller('toevoegenController', ['$scope', 'mainFactory', '$timeout', '$state', '$rootScope', '$anchorScroll', 'Upload', '$mdDialog',
	function($scope, mainFactory, $timeout, $state, $rootScope, $anchorScroll, Upload, $mdDialog) {
			
                var afbeelding = "noimage.png";
                var merkid;
                var uitbreidinggeheugen = "X";
                var nfc = "X";
                var bevestigd = "X";
                
                $scope.init = function() {
			$rootScope.homeclass = "";
			$rootScope.vergelijkenclass = "";
			$rootScope.toevoegenclass = "active";
                                    $rootScope.apiclass = "";
			$rootScope.beheerclass = "";
			$scope.afbeeldinglink = "img/uploadimage.png";
			$scope.inputfields = true;
			$scope.showselectmerk = true;
			$scope.showaddmerk = false;
			
			mainFactory.getSmartphones().then(function(response) {
				$scope.merken = response.data;
			});
		};


	   $scope.submitEdit = function() {
                        console.log('submitEdit');
                        merkid = $scope.selectedMerk.id;
                        //console.log("merkid: " + $scope.selectedMerk.id);
                        
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
                        
                        if ($scope.selectedMerk.id === undefined){
                                console.log('nieuw merk');
                                
                                mainFactory.putMerkToevoegen($scope.selectedMerk).then(function(response) {
                                        if(response.data === "Error"){
                                                console.log("Error. Merk kon niet worden toegevoegd.");
                                        }
                                        else{
                                                //merkid = response.data;
                                                //console.log(response.data.id);
                                                merkid = response.data.id;
                                                console.log(merkid);
                                                
                                                verstuurDan();
                                        }
                                });
                        }
                        
                        else{
                               verstuurDan();
                        }
                        
                        
                };
			         
                function verstuurDan(){         
                                     
                        var editInputFields = [];
                        editInputFields.push(/* 0 */ merkid, /* 1 */$scope.editmodel, /* 2 */$scope.editintroductie, /* 3 */$scope.editafmetingen, /* 4 */$scope.editgewicht, /* 5 */$scope.editbesturingssysteem,
                                                                 /* 6 */$scope.editprocessor, /* 7 */$scope.editinterneopslag, /* 8 */uitbreidinggeheugen, /* 9 */$scope.editnetwerk, /* 10 */$scope.editbluetooth,
                                                                 /* 11 */$scope.editusb, /* 12 */$scope.editsimkaart, /* 13 */$scope.editschermformaat, /* 14 */$scope.editresolutie, /* 15 */$scope.editcamera,
                                                                 /* 16 */$scope.editvideoresolutie, /* 17 */$scope.editfrontcamera, /* 18 */$scope.editbatterij, /* 19 */bevestigd,  /* 20 */ afbeelding,
                                                                 /* 21 */ nfc);
                        
                        console.log(editInputFields);
                        mainFactory.postToevoegen(editInputFields).then(function(response) {
                                $scope.feedback = true;
                                $scope.inputfields = false;
                                $anchorScroll();
                                if(response.data === "Toegevoegd"){
                                        $scope.feedbackmelding = "De gegevens zijn succesvol verzonden. Na goedkeuring van de webmaster zal de smartphone zichtbaar worden.";
                                }
                                else if(response.data === "Error"){
                                        $scope.feedbackmelding = "Error. De gegevens konden niet verzonden worden.";
                                }
                        });
                }
		
			
	
		// upload on file select or drop
		$scope.upload = function (file) {
			Upload.upload({
				url: 'php/upload.php',
				data: {file: file, 'targetPath' : '../img/'}
			}).then(function (resp) {
				console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
				$scope.afbeeldinglink = "img/" + resp.config.data.file.name;
				afbeelding = resp.config.data.file.name;
			}, function (resp) {
				console.log('Error status: ' + resp.status);
			}, function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			});
		};
		

                $scope.showPrompt = function(ev) {
                        var confirm = $mdDialog.prompt()
                          .title('Nieuw merk toevoegen')
                          //.textContent('Voer het ')
                          //.placeholder('Dog name')
                          .ariaLabel('Merknaam')
                          .initialValue('')
                          .targetEvent(ev)
                          .ok('Toevoegen')
                          .cancel('Annuleren');
                        $mdDialog.show(confirm).then(function(result) {
                          //console.log($scope.merken);
                          $scope.merken.unshift({
                                id: undefined,
                                naam: result
                           });
                        }, function() {
                        });
                };
		
	
	}]); //mainController