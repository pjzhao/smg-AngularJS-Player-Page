'use strict';

/* Directives */

var playerDirectives = angular.module('playerDirectives', []);

playerDirectives.directive("fbLike", function($rootScope) {
    return function (scope, iElement, iAttrs) {
        if (FB && scope.$last) {
            FB.XFBML.parse(iElement[0]);
        }
    };
});

