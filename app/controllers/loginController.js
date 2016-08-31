app.controller('loginController', ['$scope', 'mainFactory', '$rootScope', '$state',
	function($scope, mainFactory, $rootScope, $state) {
		
		$scope.init = function() {
			$rootScope.homeclass = "";
			$rootScope.vergelijkenclass = "";
			$rootScope.toevoegenclass = "";
			$rootScope.apiclass = "";
			$rootScope.beheerclass = "active";
		};
		
		$scope.inloggen = function() {
			mainFactory.postInloggen($scope.emailadres, $scope.wachtwoord).then(function(response) {
				console.log(response.data);
				if(response.data === "Success"){
					$state.go('beheer');
					$rootScope.ingelogd = 1;
				}
				else{
					$scope.wronginlog = "true";
				}
			});
			
		};
	}
]);