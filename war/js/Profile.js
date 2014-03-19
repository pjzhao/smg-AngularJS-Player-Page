function Profile(playerId, nickname, email, password, pictureUrl) {
    this.playerId = playerId;
    this.nickname = nickname;
    this.email = email;
    this.password = password; 
    this.pictureUrl = pictureUrl; 
} 


function ProfileCtrl($scope, $http) {
/*	$http.get("json/profile.json").success(function(data) {
			$scope.profile = data;  
		});  */
	$scope.profile = new Profile("1", "Pinji",
		 "pz454@nyu.edu", "0999999999", 
		 "https://scontent-a-lga.xx.fbcdn.net/hphotos-ash2/t1.0-9/391857_122702101173730_12885128_n.jpg");

    $scope.profileNickname = $scope.profile.nickname;
	$scope.profileEmail = $scope.profile.email;
	$scope.profilePicUrl = $scope.profile.pictureUrl;
	$scope.edit = function () {
		$scope.profile.nickname = $scope.profileNickname;
		$scope.profile.email = $scope.profileEmail;
		$scope.profile.pictureUrl = $scope.profilePicUrl;
	};
}
