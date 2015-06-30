// core.js
	var mellow = angular.module('mellow', []);
	var host = "salvatorecriscione.com";
	
	mellow.controller("MainController", function($scope, $http){
		if ( hashmellow.existsFile() ) {
			$http.get('/api/hash/' + hashmellow.fileurl)
				.success(function(data) {
					$scope.fileInfo = data;
					$('#sha1').val(data.sha1);
					console.log(data);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
		
		$scope.createHash = function() {
			if ( !hashmellow.existsFile() ) {
				$http.post('/api/hash', $scope.formdata)
					.success(function(data) {
						$scope.formdata = {};
						$scope.fileInfo = data;
						console.log(data);
						$scope.output = "http://" + host + ":8080/#" + btoa(data._id);
						location.hash = btoa(data._id);
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			};
		}
	});