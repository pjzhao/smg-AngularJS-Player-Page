'use strict';

/* History-list Controller */

var historyListControllers = angular.module('historyListControllers', []);

//Hisroty & Recommendation
historyListControllers.controller('HistoryListCtrl', ['$scope', '$rootScope', '$window', '$routeParams', '$http', '$cookieStore', '$filter', '$location',
    function ($scope, $rootScope, $window, $routeParams, $http, $cookieStore, $filter, $location){  
  $scope.playerId = $cookieStore.get('playerIdTag');
  $scope.accessSignature = $cookieStore.get('accessSignatureTag'); 
  /*$http.get('http://4.smg-server.appspot.com/playerAllGame?playerId=' + $scope.playerId + '&targetId='' + $scope.playerId + 
    '&accessSignature=' + $scope.accessSignature) */
  $http.get('../historys/histories.json')
  .success(function(data){
    $scope.historyTemp = data;
  })
  .then(function(){
    $scope.historySummaryResponse();
  });

  $scope.historySummaryResponse = function() {
    if($scope.historyTemp.error){
	    $window.alert($scope.historyTemp.error);
	    $scope.historyTemp = null;
	    $location.url("/profile/" + $scope.playerId + '?accessSignature=' + $scope.accessSignature);
    } else {
    	$scope.historySummary = [];
    	var history_parsed = $parse($scope.historyTemp);
    	for (var item in history_parsed) {
    		var historyRecord = {
    			"win" : item.win,
    			"lost" : item.lost,
    			"draw" : item.draw,
    			"RANK" : item.RANK,
    			"score" : item.score,
    			"token" : item.token,
    			"total"	: item.win + item.lost + item.draw,
    			"winRate" : item.win/item.total
    		};
    		var historyRecordStr = angular.toJson(historyRecord);
    		$scope.historySummary.push(historyRecordStr);
    		console.log($scope.historySummary);
    	}
    }
  };


    // init
    $scope.sort = {       
        sortingOrder : 'win',
        reverse : false
    };
    
    $scope.gap = 10;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 10;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };
    
  
    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        //for (var i = 0; i < $scope.filteredItems.length; i++) { --Pinji
        for (var i = 0; i < 8; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };
    
    $scope.range = function (size, start, end) {
        var ret = [];        
        console.log(size,start, end);
                      
        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
         console.log(ret);        
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();

}]);

historyListControllers.$inject = ['$scope', '$filter'];

historyListControllers.directive("customSort", function() {
return {
    restrict: 'A',
    transclude: true,    
    scope: {
      order: '=',
      sort: '='
    },
    template : 
      ' <a ng-click="sort_by(order)" style="color: #555555;">'+
      '    <span ng-transclude></span>'+
      '    <i ng-class="selectedCls(order)"></i>'+
      '</a>',
    link: function(scope) {
                
    // change sorting order
    scope.sort_by = function(newSortingOrder) {       
        var sort = scope.sort;
        
        if (sort.sortingOrder == newSortingOrder){
            sort.reverse = !sort.reverse;
        }                    

        sort.sortingOrder = newSortingOrder;        
    };
    
   
    scope.selectedCls = function(column) {
        if(column == scope.sort.sortingOrder){
            return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
        }
        else{            
            return'icon-sort' 
        } 
    };      
  }// end link
}
});