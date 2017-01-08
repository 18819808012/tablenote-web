var trade = angular.module('trade', ['ngRoute', 'trade.directives', 'trade.services', 'oc.lazyLoad']);
trade.controller('registerLoginController', ['$scope', 'User', '$ocLazyLoad', function ($scope, User, $ocLazyLoad) {
  console.log(1111);
  $ocLazyLoad.load(['scripts/vendor/jquery-2.1.4.min.js','scripts/vendor/canvas.js']);
  $scope.showLogin = true;
  var userInfo = new User();
  $scope.register = userInfo.register();
  $scope.user = {
    'user': 'I will fuck your mother!',
    'email': 'kimffy@email.com',
    'password': 'JiefzzLon',
    'wechat': '1077101169',
    'linkin': 'system@tablenote.com'
  };
  $scope.showRegisterPage = function(){
    $scope.showLogin = false;
  }
  $scope.showLoginPage = function(){
    $scope.showLogin = true;
  }
}]);
trade.controller('listCtrl', ['$scope', function ($scope) {
  $scope.title="Trade";
}]);

trade.config(['$routeProvider', '$ocLazyLoadProvider', '$sceDelegateProvider', function($routeProvider, $ocLazyLoadProvider, $sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(tablenote|youtube)\.com(/.*)?$', 'self']);
  //路由配置
  $routeProvider.when('/', {
    controller: 'listCtrl',
    templateUrl:'/views/user/list.html'
  }).when('/register', {
    controller: 'registerLoginController',
    templateUrl:'/views/user/register.html'
  }).otherwise({redirectTo:'/'});

  //动态加载模块设置
  $ocLazyLoadProvider.config({
    debug: true,
    events: true,
    modules: [
      {
        name: 'jquery',
        files: ['../vendor/jquery-2.1.4.min.js']
      },
      {
        name: 'canvas',
        files: ['../vendor/canvas.js']
      },
      {
        name: 'bootstrap',
        files: ['../vendor/bootstrap.min.js']
      }
    ]
  })
}]);
//禁止模板缓存
trade.run(function($rootScope, $templateCache) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (typeof(current) !== 'undefined'){
      $templateCache.remove(current.templateUrl);
    }
  });
});
