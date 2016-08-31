app.controller('headerController', ['$rootScope', '$scope', '$state',
	function($rootScope, $scope, $state) {
		if(getCookie("Login") === "2be05fa06d70a51135a6c2caba7f0047"){
			$rootScope.ingelogd = 1;
		}
		else{
			$rootScope.ingelogd = 0;
		}
		
		$scope.uitloggen = function() {
			setCookie("Login","",-1);
			setCookie("Naam","",-1);
			$rootScope.ingelogd = false;
			$state.go('login');
		};
		
		function setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = "expires="+d.toUTCString();
			document.cookie = cname + "=" + cvalue + "; " + expires;
		}
		
		function getCookie(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) === 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		}

	}
]);