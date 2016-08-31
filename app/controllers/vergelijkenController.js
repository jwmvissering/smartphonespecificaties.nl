app.controller('vergelijkenController', ['$scope', 'mainFactory', '$timeout', '$rootScope',
	function($scope, mainFactory, $timeout, $rootScope) {

		var above;
		var merkid;
		var modelid;

		$scope.init = function() {
			$rootScope.homeclass = "";
			$rootScope.vergelijkenclass = "active";
			$rootScope.toevoegenclass = "";
			$rootScope.apiclass = "";
			$rootScope.beheerclass = "";
			
			
			//console.log('init');
			mainFactory.getSmartphones().then(function(response) {
				$scope.merken = response.data;
				$scope.merken2 = response.data;
				
				for(var i in $scope.merken){
					if($scope.selectedMerk == $scope.merken[i].id){
						$scope.selectedMerkNaam = $scope.merken[i].naam;
						return;
					}	
				}
				
			});
			
			//mainFactory.getSmartphones($rootScope.rootmerkid).then(function(response) {
			//	$scope.smartphones = response.data;
			//});

			if ($rootScope.rootmerkid && $rootScope.rootmodelid) {
				console.log('rootscope merkid', $rootScope.rootmerkid);
				
				$scope.selectedMerk = $rootScope.rootmerkid;
				$scope.selectedSmartphone = $rootScope.rootmodelid;
				
				mainFactory.getSmartphones($rootScope.rootmerkid).then(function(response) {
					$scope.smartphones = response.data;
				});
				mainFactory.getSpecifications($scope.selectedSmartphone).then(function(response) {
					$scope.specificaties = response.data;
				});
				$scope.showSpecs = true;
 
			}
			

		}; //init()

		$scope.changeMerk = function() {
			//console.log('Merk changed');
			$scope.showSpecs = false;
			//console.log($scope.selectedMerk.naam);
			

			mainFactory.getSmartphones($scope.selectedMerk).then(function(response) {
				$scope.smartphones = response.data;
			});
			
			for(var i in $scope.merken){
				if($scope.selectedMerk == $scope.merken[i].id){
					$scope.selectedMerkNaam = $scope.merken[i].naam;
					return;
				}	
			}
		};

		$scope.changeMerk2 = function() {
			//console.log('Merk changed');
			$scope.showSpecs2 = false;


			mainFactory.getSmartphones($scope.selectedMerk2).then(function(response) {
				$scope.smartphones2 = response.data;
			});
			
			for(var i in $scope.merken2){
				if($scope.selectedMerk2 == $scope.merken2[i].id){
					$scope.selectedMerkNaam2 = $scope.merken2[i].naam;
					return;
				}	
			}
		};

		$scope.changeSmartphone = function() {
			//console.log('changesmartphone()');
			if ($scope.selectedSmartphone) {
				mainFactory.getSpecifications($scope.selectedSmartphone).then(function(response) {
					$scope.specificaties = response.data;
				});
				$scope.showSpecs = true;
			}
			
			$scope.merknaam = $scope.selectedMerk.naam;
		};

		$scope.changeSmartphone2 = function() {
			//console.log('changesmartphone()');
			if ($scope.selectedSmartphone2) {
				mainFactory.getSpecifications($scope.selectedSmartphone2).then(function(response) {
					$scope.specificaties2 = response.data;
				});
				$scope.showSpecs2 = true;
			}
		};

	}
]); //vergelijkenController