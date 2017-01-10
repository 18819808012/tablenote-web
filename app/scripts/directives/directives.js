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
