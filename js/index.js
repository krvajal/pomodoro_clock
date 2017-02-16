
angular.module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

.controller('AppCtrl', function($scope, $timeout) {

  $scope.timerRunning = false;
  const progressElement =   document.querySelector(".progress");


  $scope.toggleStatus =function(){
    progressElement.classList.toggle("playing-session");
      $scope.timerRunning = !$scope.timerRunning;

  }
  var config={
    sessionLength: {hour: 0, min: 25, sec: 0},
    breakLenght: {hour: 0, min: 5, sec: 0}
  };
});