app.factory('mainFactory', ['$http', '$q', function($http, $q) {

	var factory = {};
	var url;
	factory.getSmartphones = function(id){
		
		if(!id){
			url = "../../php/allsmartphones.php";
		}
		else{
			url = "../../php/allsmartphones.php?merk=" + id;
		}
		
		var deffered = $q.defer();
		return $http({
			method: 'GET',
			url: url
		}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
		//return factory;
		
	};
	
	factory.getSpecifications = function(id){
		
		url = "../../php/getspecifications.php?model=" + id;
		
		var deffered = $q.defer();
		return $http({
			method: 'GET',
			url: url
		}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
		//return factory;
		
	};
	
	factory.postEditForm = function(fields){
		var deffered = $q.defer();
		
		return $http.post('php/editphone.php',{'files' : fields}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};
	
	factory.postInloggen = function(email, ww){
		var deffered = $q.defer();
		
		return $http.post('php/inloggen.php',{'email' : email, 'wachtwoord' : ww}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};
	
	factory.getAanpassingen = function(){
		var deffered = $q.defer();
		
		return $http.get('php/aanpassingen.php').success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};
	
	factory.deleteAanpassing = function(id){
		var deffered = $q.defer();
		
		return $http({
			method: 'DELETE',
			url: 'php/aanpassingen.php',
			data: {'id' : id}
		}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};
	
	factory.putAanpassing = function(aanpassingsid, smartphoneid){
		var deffered = $q.defer();
		
		return $http({
			method: 'PUT',
			url: 'php/aanpassingen.php',
			data: {'aanpassingsid' : aanpassingsid,
					'smartphoneid': smartphoneid}
		}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};

	
	/* Toevoegen.html */
	factory.postToevoegen = function(fields){ 
		var deffered = $q.defer();
		
		return $http.post('php/addphone.php',{'files' : fields}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};
	
	factory.putMerkToevoegen = function(merk){ 
		var deffered = $q.defer();
		
		return $http.put('php/addphone.php',{'merk' : merk}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};
	
	
	
	factory.getToevoegingen = function(){
		var deffered = $q.defer();
		
		return $http.get('php/nieuwetelefoons.php').success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};

	factory.putToevoeging = function(toevoegingsid){
		var deffered = $q.defer();
		
		return $http({
			method: 'PUT',
			url: 'php/nieuwetelefoons.php',
			data: {'toevoegingsid' : toevoegingsid}
		}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};

	factory.deleteToevoeging = function(id){
		var deffered = $q.defer();
		
		return $http({
			method: 'DELETE',
			url: 'php/nieuwetelefoons.php',
			data: {'id' : id}
		}).success(function(data){
			deffered.resolve(data.results);
		}).error(function(data){
			// something
		});
	};
	
	return factory;
	
	
}]);