/**
 * Created by zhangxp10 on 2017-1-6.
 */
var trade = angular.module('trade', ['ngRoute', 'trade.directives', 'trade.services']);
trade.controller('registerCtrl', ['$scope', 'register', function ($scope, register) {
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
    resolve: {user: $scope.user},
    templateUrl:'/views/user/register.html'
  }).otherwise({redirectTo:'/'});
}]);
