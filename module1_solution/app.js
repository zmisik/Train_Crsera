(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope','$filter'];

function LunchCheckController($scope,$filter) {
$scope.checkData = function () {
  if (!$scope.strdata) {
    $scope.message = "Please enter data first!"
    return;
};


var stringtosplit = $scope.strdata;
console.log(stringtosplit);
var splits = stringtosplit.split(',')

  //console.log($scope.strdata)
console.log(splits)
console.log(splits.length)
if (splits.length <=3) {
    $scope.message ="Enjoy!"
} else if (splits.length > 3){
    $scope.message ="Too much!"
};

}
};



})();
