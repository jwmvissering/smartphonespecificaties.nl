app.controller('apiController', ['$scope', 'mainFactory', '$rootScope', '$state',
	function($scope, mainFactory, $rootScope, $state) {
		
		$scope.init = function() {
			$rootScope.homeclass = "";
			$rootScope.vergelijkenclass = "";
			$rootScope.toevoegenclass = "";
			$rootScope.apiclass = "active";
			$rootScope.beheerclass = "";
		};
		
	}
]);