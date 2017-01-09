var trade = angular.module('trade', ['ngRoute', 'trade.directives', 'trade.services', 'oc.lazyLoad']);
trade.controller('registerLoginController', ['$scope', '$route', 'User', '$ocLazyLoad', 'util', function ($scope, $route, User, $ocLazyLoad, util) {
  console.log(1111);
  $ocLazyLoad.load(['scripts/vendor/canvas.js']).then(function(){
    //背景动态渲染
    drawBackGround();
  });
  util.showMsg('加载中...');
  $scope.showLogin = true;
  var userInfo = new User();
  $scope.showRegisterPage = function(){
    $scope.showLogin = false;
  }
  $scope.showLoginPage = function(){
    $scope.showLogin = true;
  }
  $scope.registerUser = function(model){
    userInfo.register(model).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        util.showMsg('保存成功!');
        $route.reload();
      }else{
        util.showMsg(response.message);
      }
    });
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
