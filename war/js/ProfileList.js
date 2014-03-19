function ProfileListCtrl($scope) {
    $scope.profilelist = [
	     new Profile("1", "Pinji",
		 "pz454@nyu.edu", "0999999999", 
		 "https://scontent-a-lga.xx.fbcdn.net/hphotos-ash2/t1.0-9/391857_122702101173730_12885128_n.jpg"),
         new Profile("2", "Mark",  
         "Mark.Brunner@testemail.com", "0999999999", "/#"),
		 new Profile("3", "Tom",
		 "Tom@testemail.com", "0111111", "/#")
    ];

	$scope.delete = function (index) {
        $scope.profilelist.splice(index, 1);
	};
} 