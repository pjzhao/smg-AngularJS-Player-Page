function History(playerId, gameId, winCount, loseCount, tieCount) {
    this.playerId = playerId;
    this.gameId = gameId;
    this.winCount = winCount;
    this.loseCount = loseCount; 
    this.tieCount = tieCount;
	this.total = winCount + loseCount + tieCount; 
} 

function HistoryCtrl($scope) {
	$scope.playerId = "1";
    $scope.history = [
	new History($scope.playerId, "0001", 1, 0, 2),
	new History($scope.playerId, "0002", 4, 3, 0),
	new History($scope.playerId, "0003", 0, 1, 7)
	];
} 