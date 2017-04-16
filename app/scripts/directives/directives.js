/**
 * Created by zhangxp10 on 2017-1-6.
 */
'use strict';
var directives = angular.module('trade.directives', []);
directives.directive('loadingbar', ['$rootScope',
  function($rootScope) {
    return {
      link: function(scope, element, attrs) {
        element.addClass('hide');
        $rootScope.$on('$routeChangeStart', function() {
          element.removeClass('hide');
        });

        $rootScope.$on('$routeChangeSuccess', function() {
          element.addClass('hide');
        });
      }
    };
  }]);
directives.directive('ngUpdateHidden',function() {
  return function(scope, el, attr) {
    var model = attr['ngModel'];
    scope.$watch(model, function(nv) {
      el.val(nv);
    });

  };
})

directives.directive('errSrc', function(){
  return {
    link: function(scope, element, attrs){
      element.bind('error', function(){
        if(attrs.src!=attrs.errSrc){
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});
directives.directive('dateFormat', ['$filter', function($filter){
  var dateFilter = $filter('date');
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      function formatter(value) {
        console.log('value111:'+value);
        return dateFilter(value, 'yyyy-MM-dd'); //format
      }

      function parser() {
        console.log('parser:'+ctrl.$modelValue);
        return ctrl.$modelValue;
      }
      ctrl.$formatters.push(formatter);
      ctrl.$parsers.unshift(parser);

    }
  };
}]);
