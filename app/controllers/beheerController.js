app.controller('beheerController', ['$scope', 'mainFactory', '$rootScope', '$state', '$mdDialog', '$mdMedia',
	function($scope, mainFactory, $rootScope, $state, $mdDialog, $mdMedia) {
		
		if($rootScope.ingelogd !== 1){
			$state.go('login');
		}
		
		$scope.init = function() {
			$scope.goedkeuren = "Goedkeuren";
			$scope.afkeuren = "Afkeuren";
			
			$rootScope.homeclass = "";
			$rootScope.vergelijkenclass = "";
			$rootScope.toevoegenclass = "";
			$rootScope.apiclass = "";
			$rootScope.beheerclass = "active";
			
			$scope.info = false;
			
			mainFactory.getAanpassingen().then(function(response) {
				$scope.aanpassingen = response.data;
			});
			
			mainFactory.getToevoegingen().then(function(response) {
				$scope.nieuwetelefoon = response.data;
			});
		};
		

		
		$scope.dialogAanpassingGoedkeuren = function(index, aanpassingsid, smartphoneid) {
		  // Appending dialog to document.body to cover sidenav in docs app
		  var confirm = $mdDialog.confirm()
				.title('Weet je zeker dat je deze aanpassing wilt goedkeuren?')
				.textContent('Deze actie kan niet ongedaan worden gemaakt.')
				.ariaLabel('Goedkeuren')
				.ok('Goedkeuren')
				.cancel('Annuleren');
	  
		  $mdDialog.show(confirm).then(function() {
			aanpassingGoedkeuren(index, aanpassingsid, smartphoneid);
		  }, function() {
			console.log('annuleren');
		  });
		};
		
		
		function aanpassingGoedkeuren(index, aanpassingsid, smartphoneid){
			console.log("goedkeuren", aanpassingsid, smartphoneid);
			
			mainFactory.putAanpassing(aanpassingsid, smartphoneid).then(function(response) {
				if(response.data === "Success"){
					console.log('Gelukt');
					$scope.aanpassingen.splice(index, 1);
				}
				else{
					console.log('Mislukt');
				}
			});
		}
		
		$scope.dialogAanpassingAfkeuren = function(index, id) {
		  // Appending dialog to document.body to cover sidenav in docs app
		  var confirm = $mdDialog.confirm()
				.title('Weet je zeker dat je deze aanpassing wilt afkeuren?')
				.textContent('Deze actie kan niet ongedaan worden gemaakt.')
				.ariaLabel('Afkeuren')
				.ok('Afkeuren')
				.cancel('Annuleren');
		  $mdDialog.show(confirm).then(function() {
			aanpassingAfkeuren(index, id);
		  }, function() {
			//console.log('annuleren');
		  });
		};
		
		
		function aanpassingAfkeuren(index, id){
			//console.log('afkeuren', id);
			
			mainFactory.deleteAanpassing(id).then(function(response) {
				//console.log("response: " + response.data);
				if(response.data === "Success"){
					$scope.aanpassingen.splice(index, 1);
				}
				else{
					console.log('Mislukt');
				}
			});
		}
		
		
		$scope.dialogToevoegingGoedkeuren = function(index, toevoegingsid) {
		  // Appending dialog to document.body to cover sidenav in docs app
		  var confirm = $mdDialog.confirm()
				.title('Weet je zeker dat je deze toevoeging wilt goedkeuren?')
				.textContent('Deze actie kan niet ongedaan worden gemaakt.')
				.ariaLabel('Goedkeuren')
				.ok('Goedkeuren')
				.cancel('Annuleren');
	  
		  $mdDialog.show(confirm).then(function() {
			toevoegingGoedkeuren(index, toevoegingsid);
		  }, function() {
			console.log('annuleren');
		  });
		};
		
		
		function toevoegingGoedkeuren(index, toevoegingsid){
			
			mainFactory.putToevoeging(toevoegingsid).then(function(response) {
				if(response.data === "Success"){
					console.log('Gelukt');
					$scope.nieuwetelefoon.splice(index, 1);
				}
				else{
					console.log('Mislukt');
				}
			});
		}
		
		$scope.dialogToevoegingAfkeuren = function(index, id) {
		  // Appending dialog to document.body to cover sidenav in docs app
		  var confirm = $mdDialog.confirm()
				.title('Weet je zeker dat je deze toevoeging wilt afkeuren?')
				.textContent('Deze actie kan niet ongedaan worden gemaakt.')
				.ariaLabel('Afkeuren')
				.ok('Afkeuren')
				.cancel('Annuleren');
		  $mdDialog.show(confirm).then(function() {
			toevoegingAfkeuren(index, id);
		  }, function() {
			//console.log('annuleren');
		  });
		};
		
		
		function toevoegingAfkeuren(index, id){
			//console.log('afkeuren', id);
			
			mainFactory.deleteToevoeging(id).then(function(response) {
				//console.log("response: " + response.data);
				if(response.data === "Success"){
					$scope.nieuwetelefoon.splice(index, 1);
				}
				else{
					console.log('Mislukt');
				}
			});
		}
		
	}
]);