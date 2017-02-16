
var pad = function(number, size) {
      var s = String(number);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
}


angular.module('PomodoroApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache',"ngProgressCircular"])
.controller('AppCtrl', function($scope, $interval) {

  var self = this;
  self.timerRunning = false;
  const progressElement =   document.querySelector(".progress");
  const sound = document.getElementById("break-sound");

  self.currentTimeInSeconds = 25 * 60;   // 25 mins

  var stop;
  var startingFromPause = false;
  self.onSession = true; // the clock is running the session interval
  self.progress = 0;

  var  getCurrentProgress = function(){
    var timeFraction = self.currentTimeInSeconds * 1.0;
    var length = (self.onSession)?
           getTimeInSeconds(self.config.sessionLength):
           getTimeInSeconds(self.config.breakLength);
           timeFraction = (length - timeFraction)/length;
    return Math.floor( timeFraction *  100);
  }
  var startSessionTimer = function(){

      if(!startingFromPause){
        // first time the timer starts
        // grab the info from the config
        self.currentTimeInSeconds = getTimeInSeconds(self.config.sessionLength);
      }
      stop = $interval(function(){

          console.log(self.currentTimeInSeconds);
          self.currentTimeInSeconds--;
          self.progress = getCurrentProgress();

      }, 1000, self.currentTimeInSeconds).then(function(){
          //timer done
          // reset the fields
          self.onSession = false;
          self.startingFromPause = false;
          self.progress = 0;
          sound.play();
          startBreakTimer();
      });

  }

   var startBreakTimer = function(){

      if(!startingFromPause){
        self.currentTimeInSeconds = getTimeInSeconds(self.config.breakLength);
      }
      stop = $interval(function(){

          console.log(self.currentTimeInSeconds);

          self.currentTimeInSeconds--;
          self.progress = getCurrentProgress();

      }, 1000, self.currentTimeInSeconds).then(function(){
          //timer done
          self.onSession = true;
          self.timerRunning = false;
          sound.play();
          self.progress = 0;
          progressElement.classList.toggle("playing-session");
          // session + break done
      });
  }


  self.stopTimer = function(){
      if(stop){
        self.startingFromPause = true;
        $interval.cancel(stop);
        stop = undefined;
      }
  }
  function getTimeInSeconds(timeLength){
      var l = timeLength;
      return l.hour * 3600 + l.min * 60 + l.sec;
  }

  $scope.toggleStatus = function(){
    progressElement.classList.toggle("playing-session");
      self.timerRunning = !self.timerRunning;
      if(self.timerRunning){
          // continue count down
        if(self.onSession) {
          startSessionTimer();
        }else{
          startBreakTimer();
        }

      }else{
         self.stopTimer();
      }
  }
  self.config = {
    sessionLength: {hour: 0, min: 0, sec: 5},
    breakLength: {hour: 0, min: 0, sec: 5}
  };
  self.countDownClass = function(){
    return {"count-down-container":true, "red-countdown": !self.onSession};
  }
})


angular.module('PomodoroApp').filter("hoursandmins", function(){
  return function(seconds){
    if(seconds < 0 )return;
    var hourValue = Math.floor((seconds > 3600)? (seconds/ 3600): 0).toFixed();
    var minVal =  seconds - ( hourValue * 3600);
    minVal  = Math.floor((minVal > 60 )?(minVal / 60) :0).toFixed();
    return  pad(hourValue, 2) +  ":"  + pad(minVal, 2);
  }
});

angular.module('PomodoroApp').filter("seconds", function(){
  return function(seconds){
    if(seconds < 0 )return;
    var secondsValue = seconds % 60;
    return  pad(secondsValue,2);
  }
});

