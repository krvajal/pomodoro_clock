angular.module("ngProgressCircular",[]).directive("progressCircular", function(){

   return {
     scope: {},
      restrict: 'E',
      replace: 'true',
      template: '<div ng-class="getProgressClass()">'
     + '<div class="circle left"></div>'
+ '<div class="circle right"></div>'
+ '</div>',
   link: function(scope,element, attrs){

     var leftCircle = angular.element(element.children()[0]);

     var rightCircle =  angular.element(element.children()[1]);

     attrs.$observe("progress", function(progressInPercent) {

      if(progressInPercent < 0)
        progressInPercent  = 0;
      if(progressInPercent > 0)
        progressInPercent = 0;
         var progress = Number(progressInPercent)/100.0 * 360.0;
       console.log(progress);
        scope.getProgressClass = function(){
          return {'frame':true,"half-filled": progress > 180};
        }

       if(progress <= 180){

          rightCircle.css("transform", "rotateZ(" + progress + "deg)");
       }else{
        rightCircle.css("transform", "rotateZ(180deg)");
       }
       leftCircle.css("transform","rotateZ(" + progress + "deg)");
      });
     }};
});
