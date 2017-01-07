/**
 * Created by zhangxp10 on 2017-1-6.
 */
var trade = angular.module('trade', ['ngRoute', 'trade.directives', 'trade.services']);
trade.controller('registerCtrl', ['$scope', function ($scope) {
  $scope.user = {
    'user': 'I will fuck your mother!',
    'email': 'kimffy@email.com',
    'password': 'JiefzzLon',
    'wechat': '1077101169',
    'linkin': 'system@tablenote.com'
  };
}]);
trade.controller('listCtrl', ['$scope', 'register', function ($scope, register) {
  $scope.title="Trade";
}]);
//路由配置
trade.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    controller: 'listCtrl',
    templateUrl:'/views/user/list.html'
  }).when('/register', {
    controller: 'registerCtrl',
    templateUrl:'/views/user/register.html'
  }).otherwise({redirectTo:'/'});
}]);
//禁止模板缓存
trade.run(function($rootScope, $templateCache) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (typeof(current) !== 'undefined'){
      $templateCache.remove(current.templateUrl);
    }
  });
});
