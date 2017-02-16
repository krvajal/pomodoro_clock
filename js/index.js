
angular.module('PomodoroApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
.controller('AppCtrl', function($scope, $interval) {

  var self = this;
  $scope.timerRunning = false;
  const progressElement =   document.querySelector(".progress");
  self.currentTimeInSeconds = 25 * 60;   // 25 mins

  var stop;

  self.startTimer = function(){
      stop = $interval(function(){
          console.log(self.currentTimeInSeconds);
          self.currentTimeInSeconds--;

      }, 1000, self.currentTimeInSeconds);
  }
  self.stopTimer = function(){
      if(stop){
        $interval.cancel(stop);
        stop = undefined;
      }
  }

  $scope.toggleStatus = function(){
    progressElement.classList.toggle("playing-session");
      $scope.timerRunning = !$scope.timerRunning;
      if($scope.timerRunning){
          // continue count down
          self.startTimer();
      }else{
         self.stopTimer();
      }
  }
  self.config = {
    sessionLength: {hour: 0, min: 25, sec: 0},
    breakLength: {hour: 0, min: 5, sec: 0}
  };

});
