var trade = angular.module('trade', ['ngRoute', 'trade.directives', 'trade.services', 'oc.lazyLoad']);
trade.controller('registerLoginController', ['$scope', '$route', '$location', 'User', '$ocLazyLoad', 'util', function ($scope, $route, $location, User, $ocLazyLoad, util) {
  util.drawBackground();
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
        util.showMsg('恭喜您，注册成功，跳转到登录页面!',function(){
          $route.reload();
        });
      }else{
        util.showMsg(response.message);
      }
    });
  }
  $scope.loginTrade = function(model){
    userInfo.login(model).then(function(response){
      console.log(response);
      response = {settlement: null, opid: '584fb3a08d7e52683cc7bc0f', user: '584fb3a08d7e52683cc7bc0f', success: ''};
      if(response.hasOwnProperty('success')){
        console.log('success..');
        //说明已经加入公司，需要跳转到首页
        if(response.hasOwnProperty('settlement') && response.settlement){
          console.log('index');
          $location.path('/index');
        }else{
          console.log('createOrJoinCompany');
          $location.path('/createOrJoinCompany');
        }
      }else{
        console.log('error');
        util.showMsg(response.message);
      }
    });
  }
}]);
trade.controller('listCtrl', ['$scope', function ($scope) {
  $scope.title="Trade";
}]);
trade.controller('companyController', ['$scope', '$location', 'util', 'Company', function ($scope, $location, util, Company) {
  util.drawBackground();
  var companyInfo = new Company();
  $scope.showAddCompany = function(){
    $location.path('addCompany');
  };
  $scope.showJoinCompany = function(){
    $location.path('joinCompany');
  };
  $scope.save = function(model){
    companyInfo.save(model).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        util.showMsg('恭喜您，创建成功，跳转到登录页面!',function(){
          $route.reload();
        });
      }else{
        util.showMsg(response.message);
      }
    });
  }
  $scope.update = function(model){
    companyInfo.save(model).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        util.showMsg('恭喜您，创建成功，跳转到登录页面!',function(){
          $route.reload();
        });
      }else{
        util.showMsg(response.message);
      }
    });
  }
  $scope.title="Trade";
}]);

trade.config(['$routeProvider', '$ocLazyLoadProvider', '$sceDelegateProvider', function($routeProvider, $ocLazyLoadProvider, $sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(tablenote|youtube)\.com(/.*)?$', 'self']);
  //路由配置
  $routeProvider.when('/', {
    controller: 'registerLoginController',
    templateUrl:'/views/user/register.html'
  }).when('/createOrJoinCompany', {
    controller: 'companyController',
    templateUrl:'/views/user/createOrJoinCompany.html'
  }).when('/register', {
    controller: 'registerLoginController',
    templateUrl:'/views/user/register.html'
  }).when('/addCompany', {
    controller: 'companyController',
    templateUrl:'/views/company/addCompany.html'
  }).when('/joinCompany', {
    controller: 'companyController',
    templateUrl:'/views/company/joinCompany.html'
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
