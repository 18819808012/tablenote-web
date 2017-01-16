var trade = angular.module('trade', ['ui.router', 'ui.bootstrap', 'pascalprecht.translate', 'ngTable', 'trade.directives', 'trade.filters', 'trade.services', 'oc.lazyLoad', 'ngFileUpload']);
trade.controller('registerLoginController', ['$scope', '$state',
  '$location', 'User', '$ocLazyLoad', 'util', 'Upload',
  function ($scope, $state, $location, User, $ocLazyLoad, util, Upload) {
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
        util.showMsg(util.trans('register.success'),function(){
          $state.go('login', {}, {reload: true});
        });
      }else{
        util.showMsg(response.message);
      }
    });
  }
  $scope.loginTrade = function(model){
    userInfo.login(model).then(function(response){
      //response = {settlement: null, opid: '584fb3a08d7e52683cc7bc0f', user: '584fb3a08d7e52683cc7bc0f', success: ''};
      if(response.hasOwnProperty('success')){
        userInfo.getDataByEmail(model.email).then(function(result){
          console.log('result:');
          console.log(result);
          sessionStorage.userInfo = JSON.stringify(result.user);
        });
        sessionStorage.user = JSON.stringify(response);
        console.log('success..');
        //说明已经加入公司，需要跳转到首页
        if(response.hasOwnProperty('settlement') && response.settlement){
          console.log('login');
          $state.go('index.setting.userCompanyInfo');
        }else{
          console.log('createOrJoinCompany');
          $state.go('login.createOrJoinCompany');
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
      util.showMsg(util.trans('file.uploading')+'['+progressPercentage+'%]');
    }).success(function (data, status, headers, config) {
      if(data.hasOwnProperty('success')){
        //上传成功
        console.log('file uploaded. Response: ' + data);
        $scope.uploadImg = data.avatar;
        util.showMsg(util.trans('upload.success'));
      }else{
        util.showMsg(util.trans('upload.failure')+''+data.message+'!');
      }
    }).error(function (data, status, headers, config) {
      //上传失败
      console.log('error status: ' + data);
      util.showMsg(util.trans('upload.failure'));
    });
  }
}]);
trade.controller('companyController', ['$scope', '$state', 'util', 'Company', 'User', function ($scope, $state, util, Company, User) {
  util.drawBackground();
  var companyService = new Company();
  $scope.showAddCompany = function(){
    $state.go('login.addCompany');
  };
  $scope.showJoinCompany = function(){
    $state.go('login.joinCompany');
  };
  $scope.save = function(model){
    companyService.save(model).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('message')){
        util.showMsg(response.message);
      }else{
        util.showMsg(util.trans('create.success'),function(){
          $state.go('index.setting');
        });
      }
    });
  }
  $scope.joinCompany = function(model){
    companyService.setCompanyCode(model.companyCode).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('join.success'),function(){
          console.log('恭喜您，加入成功，跳转到主页面!');
        });
      }else{
        util.showMsg(response.message);
      }
    });;
  }
  $scope.update = function(model){
    companyService.save(model).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('create.success'),function(){
          $state.reload();
        });
      }else{
        util.showMsg(response.message);
      }
    });
  }
}]);
//设置页面
trade.controller('userCompanyInfoController', ['$scope', '$state', 'util', 'Company', 'User', function ($scope, $state, util, Company, User) {
  $scope.$on('$viewContentLoaded', function(){
    util.adjustHeight();
  });
  if(!util.isLogin()){
    $state.go('login');
  }
  $scope.user = util.getUserInfo();
  $scope.userInfo = util.getBySessionStorage('userInfo');
  var companyService = new Company(), userService = new User();
  $scope.companyUpdate = function(model){
    companyService.update(model).then(function(response){
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('update.success'));
      }
    });
  }
  $scope.userUpdate = function(model){
    userService.update(model).then(function(response){
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('update.success'));
      }
    });
  }
  if($scope.user.hasOwnProperty('settlement')){
    companyService.getDataByCompanyId($scope.user.settlement).then(function(response){
      console.log('company:'+JSON.stringify(response.company));
      $scope.company = response.company;
    });
  }
  $scope.fireSelf = function(){
    companyService.fireSelf().then(function(response){
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('fire.success'));
      }else{
        util.showMsg(util.trans('fire.failure'));
      }
    });
  }
  $scope.save = function(){

  }
}]);

//设置头部Controller页面
trade.controller('accountStatusController', ['$scope', '$state', 'Company', 'util', function ($scope, $state, Company, util) {
  $scope.$on('$viewContentLoaded', function(){
    util.adjustHeight();
  });
  $scope.renew = function(){

  }
  $scope.purchase = function(){

  }
}]);
//设置头部Controller页面
trade.controller('memberManagerController', ['$scope', '$state', 'Company', 'util', function ($scope, $state, Company, util) {
  $scope.$on('$viewContentLoaded', function(){
    util.adjustHeight();
  });
  var companyService = new Company();
  $scope.data = [
    {avator:'../../images/userIcon.gif', user: '张三', charge: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', charge: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', charge: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', charge: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', charge: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', charge: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', charge: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', charge: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', charge: 'zhangsan@tablenote.com'}
  ];
}]);
//设置头部Controller页面
trade.controller('approvalController', ['$scope', '$state', 'NgTableParams', 'Company', 'util', function ($scope, $state, NgTableParams, Company, util) {
  $scope.$on('$viewContentLoaded', function(){
    util.adjustHeight();
  });
  var companyService = new Company();
  $scope.data = [
    {avator:'../../images/userIcon.gif', user: '张三', email: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', email: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', email: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', email: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', email: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', email: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', email: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', email: 'zhangsan@tablenote.com'},
    {avator:'../../images/userIcon.gif', user: '张三', email: 'zhangsan@tablenote.com'}
  ];
  $scope.tableParams = new NgTableParams({page: 1,count: 5}, {total:$scope.data.length, dataset: $scope.data});
  $scope.getApplicationList = function(){
    companyService.getApplicationList().then(function(response){

    });
  }
  $scope.agree = function(){

  }
  $scope.reject = function(){

  }
}]);
//设置头部Controller页面
trade.controller('changePasswordController', ['$scope', '$state', 'NgTableParams', 'User', 'util', function ($scope, $state, NgTableParams, User, util) {
  var userService = new User();
  $scope.changePwd = function(model){
    userService.changePwd(model).then(function(response){
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('change.pwd.success'));
        $state.go("index.setting.changePassword",{},{reload:true});
      }else{
        util.showMsg(response.message);
      }
    }, function(error){
      util.showMsg(util.trans('change.pwd.failure'));
    });
  }
}]);
//设置头部Controller页面
trade.controller('departCategoryController', ['$scope', '$state', '$uibModal', 'Company', 'util', 'context',
  function ($scope, $state, $uibModal, Company, util, context) {
  var companyService = new Company();
  $scope.showAddDepart = function(){
    $uibModal.open({
      templateUrl:'/views/modal/addDepart.html',
      controller:'addDepartController'
    });
  };
  $scope.showAddCategory = function(){
    $uibModal.open({
      templateUrl:'/views/modal/addCategory.html',
      controller:'addCategoryController'
    });
  };
  var user = util.getUserInfo();
  if(user){
    companyService.getAllDepartments(user.settlement).then(function(response){
      $scope.departs = response.departments;
      if($scope.departs &&　$scope.departs.length>0){
        $scope.currentDepart = context.currentDepart = $scope.departs[0];
        companyService.getCategories({companyId: user.settlement,department: [$scope.currentDepart]}).then(function(response){
          $scope.categories = response.categories[$scope.currentDepart];
        });
      }
    });
    $scope.removeDepart = function(model){
      if(window.confirm(util.trans('is.remove.depart')+'['+model+']')){
        companyService.removeDepart(model).then(function(response){
          if(response.hasOwnProperty('success')){
            util.showMsg(util.trans('remove.success'));
            companyService.getAllDepartments(user.settlement).then(function(response){
              $scope.departs = response.departments;
            });
          }else{
            util.showMsg(util.trans('remove.failure'));
          }
        });
      }
    }
    $scope.showCategory = function(model){
      $scope.currentDepart = context.currentDepart = model;
      companyService.getCategories({companyId: user.settlement,department: [$scope.currentDepart]}).then(function(response){
        $scope.categories = response.categories[$scope.currentDepart];
      });
    }
    $scope.removeCategory = function(model){
      if(window.confirm(util.trans('is.remove.category')+'['+model+']')){
        companyService.removeCategory({department:$scope.currentDepart,category: model}).then(function(response){
          if(response.hasOwnProperty('success')){
            util.showMsg(util.trans('remove.success'));
            util.refresh('index.category');
          }else{
            util.showMsg(util.trans('remove.failure'));
          }
        });
      }
    }
  };
  $scope.$on('addDepartSuccessEvent', function(event, data){
    companyService.getAllDepartments(user.settlement).then(function(response){
      $scope.departs = response.departments;
    });
  })
  $scope.$on('addCategorySuccessEvent', function(event, data){
    companyService.getCategories({companyId:user.settlement, department: [$scope.currentDepart]}).then(function(response){
      $scope.categories = response.categories[$scope.currentDepart];
    });
  })
}]);
//设置头部Controller页面
trade.controller('addDepartController', ['$rootScope', '$scope', '$state', '$uibModal','$uibModalInstance', 'Company', 'util', 'context',
  function ($rootScope, $scope, $state, $uibModal,$uibModalInstance, Company, util, context) {
  var companyService = new Company();
  $scope.submit = function(model){
    console.log(model);
    if(!model || !model.department){
      util.showMsg(util.trans('validate.depart.name.no.null'));
      return;
    }
    companyService.addDepart(model).then(function(response){
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('add.success'));
        $rootScope.$broadcast('addDepartSuccessEvent');
        $uibModalInstance.close();
      }else{
        util.showMsg(util.trans('add.failure'));
      }
    });
  }
  $scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
  }
}]);

//设置头部Controller页面
trade.controller('addCategoryController', ['$rootScope', '$scope', '$state', '$uibModal','$uibModalInstance', 'Company', 'util', 'context',
  function ($rootScope, $scope, $state, $uibModal,$uibModalInstance, Company, util, context) {
    var companyService = new Company();
    $scope.submit = function(model){
      console.log(model);
      if(!model){
        util.showMsg(util.trans('validate.category.name.no.null'));
        return;
      }
      companyService.addCategory({department:context.currentDepart,category: model}).then(function(response){
        if(response.hasOwnProperty('success')){
          util.showMsg(util.trans('add.success'));
          $rootScope.$broadcast('addCategorySuccessEvent');
          $uibModalInstance.close();
        }else{
          util.showMsg(util.trans('add.failure'));
        }
      });
    }
    $scope.cancel = function(){
      $uibModalInstance.dismiss('cancel');
    }
  }]);

//模板管理
//设置头部Controller页面
trade.controller('templateController', ['$scope', '$state', '$uibModal', 'Company', 'util', 'context', 'Template',
  function ($scope, $state, $uibModal, Company, util, context, Template) {
    var companyService = new Company();
    var templdateService = new Template();
    $scope.showAddDepart = function(){
      $uibModal.open({
        templateUrl:'/views/modal/addDepart.html',
        controller:'addDepartController'
      });
    };
    $scope.containDepart = function(name){
      if($scope.currentDepartments){
        for(var i in $scope.currentDepartments){
          if(name === $scope.currentDepartments[i]){
            return true;
          }
        }
      }
      return false;
    }
    $scope.initTemplate = function(index){
      $scope.currentTemplate = $scope.templates[index];
    }
    $scope.user = util.getUserInfo();
    if($scope.user.role == 'manager'){
      templdateService.getCompanyTemplates({companyId: $scope.user.settlement}).then(function(response){
        $scope.currentTemplate = response.templates[0];
        $scope.templates = response.templates;
        $scope.currentDepartments = $scope.currentTemplate.departments;
        companyService.getMyManageDepartment({companyId: $scope.user.settlement}).then(function(response){
          $scope.departs = response.departments;
        });
      });
    }else{
      templdateService.getDepartTemplates().then(function(response){
        $scope.currentTemplate = $scope.templates[0];
        $scope.templates = response.templates;
        $scope.currentDepartments = $scope.currentTemplate.departments;
        companyService.getMyManageDepartment({companyId: $scope.user.settlement}).then(function(response){
          $scope.departs = response.departments;
        });
      });
    }
    var templateObj = {
      id: null,
      companyId: $scope.user.settlement,
      department: null,
      base: null,
      content: null,
      isDelete: null,
      createTime: null,
      tmpName: '模板名称',
      tmpInfo: '模板描述'
    }
    $scope.$on('saveTemplateEvent', function(event, data){
      console.log('saveTemplateEvent');
    });
    $scope.$on('addTemplateEvent', function(event, data){
      if($scope.templates && $scope.templates.length>0){
        $scope.templates.push(templateObj);
        $scope.currentTemplate = $scope.templates[$scope.templates.length-1];
        $scope.currentDepartments = $scope.currentTemplate.departments;
      }else{
        $scope.templates = [];
        $scope.templates.push(templateObj);
        $scope.currentTemplate = $scope.templates[$scope.templates.length-1];
        $scope.currentDepartments = $scope.currentTemplate.departments;
      }
      //$scope.templates
      console.log('addTemplateEvent');
    });
    // $scope.showAddCategory = function(){
    //   $uibModal.open({
    //     templateUrl:'/views/modal/addCategory.html',
    //     controller:'addCategoryController'
    //   });
    // };
    // var user = util.getUserInfo();
    // if(user){
    //   companyService.getAllDepartments(user.settlement).then(function(response){
    //     $scope.departs = response.departments;
    //     if($scope.departs &&　$scope.departs.length>0){
    //       $scope.currentDepart = context.currentDepart = $scope.departs[0];
    //       companyService.getCategories({companyId: user.settlement,department: [$scope.currentDepart]}).then(function(response){
    //         $scope.categories = response.categories[$scope.currentDepart];
    //       });
    //     }
    //   });
    //   $scope.removeDepart = function(model){
    //     if(window.confirm(util.trans('is.remove.depart')+'['+model+']')){
    //       companyService.removeDepart(model).then(function(response){
    //         if(response.hasOwnProperty('success')){
    //           util.showMsg(util.trans('remove.success'));
    //           companyService.getAllDepartments(user.settlement).then(function(response){
    //             $scope.departs = response.departments;
    //           });
    //         }else{
    //           util.showMsg(util.trans('remove.failure'));
    //         }
    //       });
    //     }
    //   }
    //   $scope.showCategory = function(model){
    //     $scope.currentDepart = context.currentDepart = model;
    //     companyService.getCategories({companyId: user.settlement,department: [$scope.currentDepart]}).then(function(response){
    //       $scope.categories = response.categories[$scope.currentDepart];
    //     });
    //   }
    //   $scope.removeCategory = function(model){
    //     if(window.confirm(util.trans('is.remove.category')+'['+model+']')){
    //       companyService.removeCategory({department:$scope.currentDepart,category: model}).then(function(response){
    //         if(response.hasOwnProperty('success')){
    //           util.showMsg(util.trans('remove.success'));
    //           util.refresh('index.category');
    //         }else{
    //           util.showMsg(util.trans('remove.failure'));
    //         }
    //       });
    //     }
    //   }
    // };
    // $scope.$on('addDepartSuccessEvent', function(event, data){
    //   companyService.getAllDepartments(user.settlement).then(function(response){
    //     $scope.departs = response.departments;
    //   });
    // })
    // $scope.$on('addCategorySuccessEvent', function(event, data){
    //   companyService.getCategories({companyId:user.settlement, department: [$scope.currentDepart]}).then(function(response){
    //     $scope.categories = response.categories[$scope.currentDepart];
    //   });
    // })
  }]);
//设置头部Controller页面
trade.controller('templateHeaderController', ['$rootScope', '$scope', '$state', 'Company', 'util', 'context',
  function ($rootScope, $scope, $state, Company, util, context) {
    $scope.saveTemplate = function(){
      $rootScope.$broadcast('saveTemplateEvent');
    }
    $scope.addTemplate = function(){
      $rootScope.$broadcast('addTemplateEvent');
    }
  }]);
trade.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$sceDelegateProvider', '$httpProvider', '$translateProvider',
  function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $sceDelegateProvider, $httpProvider, $translateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(tablenote|youtube)\.com(/.*)?$', 'self']);
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('login', {
    url: '/',
    views: {
      'header': {
        templateUrl: '/views/header/header.html'
      },
      'content': {
        templateUrl: '/views/user/register.html',
        controller: 'registerLoginController'
      },
      'footer': {
        templateUrl: '/views/footer/footer.html'
      }
    }
  }).state('login.createOrJoinCompany', {
    url: '/createOrJoinCompany',
    views: {
      'content@': {
        templateUrl: '/views/user/createOrJoinCompany.html',
        controller: 'companyController'
      }
    }
  }).state('login.register', {
    url: '/register',
    views: {
      'content@': {
        templateUrl: '/views/user/register.html',
        controller: 'registerLoginController'
      }
    }
  }).state('login.addCompany', {
    url: '/addCompany',
    views: {
      'content@': {
        templateUrl: '/views/company/addCompany.html',
        controller: 'companyController'
      }
    }
  }).state('login.joinCompany', {
    url: '/joinCompany',
    views: {
      'content@': {
        templateUrl: '/views/company/joinCompany.html',
        controller: 'companyController'
      }
    }
  }).state('fileupload', {
    url: '/fileupload',
    views: {
      'header': {
        templateUrl: '/views/header/header.html'
      },
      'content': {
        templateUrl: '/views/user/upload.html',
        controller: 'registerLoginController'
      },
      'footer': {
        templateUrl: '/views/footer/footer.html'
      }
    }
  }).state('index', {
    url: '/index',
    resolve: {
      deps: ['$ocLazyLoad',function($ocLazyLoad){
        return $ocLazyLoad.load(['/scripts/vendor/jquery-2.1.4.min.js', '/scripts/vendor/mmGrid.js', '/scripts/vendor/Common.js']);
      }]
    },
    views: {
      'header': {
        templateUrl: '/views/header/setting-header.html'
      },
      'content': {
        templateUrl: '/views/home/home.html'
      },
      'left@index': {
        templateUrl: '/views/nav/leftNav.html'
      },
      'right@index': {
        templateUrl: '/views/setting/setting.html'
        //controller: 'settingController'
      },
      'footer': {
        templateUrl: '/views/footer/footer.html'
      }
    }
  }).state('index.setting', {
    url: '/setting',
    views: {
      'header@': {
        templateUrl: '/views/header/setting-header.html'
      },
      'right@index': {
        templateUrl: '/views/setting/setting.html'
      }
    }
  }).state('index.price', {
    url: '/price',
    views: {
      'header@': {
        templateUrl: '/views/header/price-header.html'
      },
      'right@index': {
        templateUrl: '/views/price/addPrice.html'
      }
    }
  }).state('index.setting.userCompanyInfo', {
    url: '/userCompanyInfo',
    views: {
      'mainRight@index.setting': {
        templateUrl: '/views/setting/userCompanyInfo.html',
        controller: 'userCompanyInfoController'
      }
    }
  }).state('index.setting.changePassword', {
      url: '/changePassword',
      views: {
        'mainRight@index.setting': {
          templateUrl: '/views/setting/changePassword.html',
          controller: 'changePasswordController'
        }
      }
    }).state('index.setting.accountStatus', {
    url: '/accountStatus',
    views: {
      'mainRight@index.setting': {
        templateUrl: '/views/setting/accountStatus.html',
        controller: 'accountStatusController'
      }
    }
  }).state('index.memberManager', {
    url: '/memberManager',
    views: {
      'right@index': {
        templateUrl: '/views/setting/memberManager.html',
        controller: 'memberManagerController'
      }
    }
  }).state('index.approval', {
    url: '/approval',
    views: {
      'right@index': {
        templateUrl: '/views/setting/approval.html',
        controller: 'approvalController'
      }
    }
  }).state('index.contact', {
    url: '/contact',
    views: {
      'header@': {
        templateUrl: '/views/header/contact-header.html'
      },
      'right@index': {
        templateUrl: '/views/contact/contact.html'
      }
    }
  }).state('index.message', {
    url: '/message',
    views: {
      'header@': {
        templateUrl: '/views/header/message-header.html'
      },
      'right@index': {
        templateUrl: '/views/message/message.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.inbox', {
    url: '/inbox',
    views: {
      'header@': {
        templateUrl: '/views/header/inbox-header.html'
      },
      'right@index': {
        templateUrl: '/views/inbox/inbox.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.outbox', {
    url: '/outbox',
    views: {
      'header@': {
        templateUrl: '/views/header/outbox-header.html'
      },
      'right@index': {
        templateUrl: '/views/outbox/outbox.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.draft', {
    url: '/draft',
    views: {
      'header@': {
        templateUrl: '/views/header/draft-header.html'
      },
      'right@index': {
        templateUrl: '/views/draft/draft.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.garbage', {
    url: '/garbage',
    views: {
      'header@': {
        templateUrl: '/views/header/garbage-header.html'
      },
      'right@index': {
        templateUrl: '/views/garbage/garbage.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.importProduct', {
    url: '/importProduct',
    views: {
      'header@': {
        templateUrl: '/views/header/import-product-header.html'
      },
      'right@index': {
        templateUrl: '/views/product/import.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.product', {
    url: '/product',
    views: {
      'header@': {
        templateUrl: '/views/header/product-header.html'
      },
      'right@index': {
        templateUrl: '/views/product/product.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.contactSetting', {
    url: '/contactSetting',
    views: {
      'header@': {
        templateUrl: '/views/header/contact-setting-header.html'
      },
      'right@index': {
        templateUrl: '/views/contact/contact-setting.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.category', {
    url: '/category',
    views: {
      'header@': {
        templateUrl: '/views/header/category-header.html'
      },
      'right@index': {
        templateUrl: '/views/category/category.html',
        controller: 'departCategoryController'
      }
    }
  }).state('index.template', {
    url: '/template',
    views: {
      'header@': {
        templateUrl: '/views/header/template-header.html',
        controller: 'templateHeaderController'
      },
      'right@index': {
        templateUrl: '/views/template/template.html',
        controller: 'templateController'
      }
    }
  });
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
  });
  $httpProvider.interceptors.push('watcher');
  //国际化配置
  var lang = window.localStorage.lang || 'cn';
  $translateProvider.preferredLanguage(lang);
  $translateProvider.useStaticFilesLoader({
    prefix: '/i18n/',
    suffix: '.json'
  });
}]);
//设置头部Controller页面
trade.controller('langSwitchingCtrl', ['$scope', '$state', '$translate', function ($scope, $state, $translate) {
  $scope.switching = function(lang){
    $translate.use(lang);
    window.localStorage.lang = lang;
    window.location.reload();
  };
  $scope.cur_lang = $translate.use();
}]);
//禁止模板缓存
trade.run(function($rootScope, $templateCache) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if (typeof(current) !== 'undefined'){
      $templateCache.remove(current.templateUrl);
    }
  });
});
