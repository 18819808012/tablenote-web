var trade = angular.module('trade', ['ngRoute', 'trade.directives', 'trade.services', 'oc.lazyLoad', 'ngFileUpload']);
trade.controller('registerLoginController', ['$scope', '$route', '$location', 'User', '$ocLazyLoad', 'util', 'Upload', function ($scope, $route, $location, User, $ocLazyLoad, util, Upload) {
  util.drawBackground();
  $scope.showLogin = true;
  var userInfo = new User();
  $scope.showRegisterPage = function(){
    $scope.showLogin = false;
  }
  $scope.showLoginPage = function(){
    $scope.showLogin = true;
  }
  $scope.login={
    deviceId: 'nil',
    deviceType: 'nil',
    deviceName: 'nil'
  };
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
      //response = {settlement: null, opid: '584fb3a08d7e52683cc7bc0f', user: '584fb3a08d7e52683cc7bc0f', success: ''};
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
  $scope.uploadAvatar = function(){
    var param={};
    param.avatar=$scope.avatar;
    Upload.upload({
      //服务端接收
      url: baseUrl + 'user/avatar',
      //上传的文件
      data: param,
      file: $scope.avatar
    }).progress(function (evt) {
      //进度条
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      util.showMsg('文件上传中['+progressPercentage+'%]');
    }).success(function (data, status, headers, config) {
      if(data.hasOwnProperty('success')){
        //上传成功
        console.log('file uploaded. Response: ' + data);
        $scope.uploadImg = data.avatar;
        util.showMsg('上传成功!');
      }else{
        util.showMsg('上传失败,'+data.message+'!');
      }
    }).error(function (data, status, headers, config) {
      //上传失败
      console.log('error status: ' + data);
      util.showMsg('上传失败,请重新上传!');
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
  $scope.joinCompany = function(model){
    companyInfo.setCompanyCode(model.companyCode).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        util.showMsg('恭喜您，加入成功，跳转到主页面!',function(){
          console.log('恭喜您，加入成功，跳转到主页面!');
        });
      }else{
        util.showMsg(response.message);
      }
    });;
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
  }).when('/fileupload', {
    controller: 'registerLoginController',
    templateUrl:'/views/upload/upload.html'
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
