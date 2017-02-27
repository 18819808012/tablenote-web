var trade = angular.module('trade', ['ui.router', 'ui.bootstrap', 'pascalprecht.translate', 'ngTable', 'ngAnimate',
  'trade.directives', 'trade.filters', 'trade.services', 'oc.lazyLoad', 'ngFileUpload', 'ngCookies']),
  baseUrl = 'http://www.tablenote.com/';;
trade.controller('registerLoginController', ['$scope', '$rootScope', '$state',
  '$location', 'User', '$ocLazyLoad', 'util', 'Upload',
  function ($scope, $rootScope, $state, $location, User, $ocLazyLoad, util, Upload) {
  util.drawBackground();
  $rootScope.showCanvas = true;
  $rootScope.logout = function(){
    console.log(1111);
    if(window.confirm(util.trans('is.logout'))){
      util.logout().then(function(response){
        if(response.hasOwnProperty('success')){
          $state.go('login');
          sessionStorage.clear();
        }else{
          $state.go('login');
          sessionStorage.clear();
        }
      });
    }
  }
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
    model.seller='both';
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
        $rootScope.showCanvas = false;
        $rootScope.isLogin = true;
        userInfo.getDataByEmail(model.email).then(function(result){
          console.log(result);
          if(result.user.avatar){
            result.user.avatar = baseUrl+result.user.avatar;
            $rootScope.userAvatar = result.user.avatar;
          }
          sessionStorage.userInfo = JSON.stringify(result.user);
          sessionStorage.user = JSON.stringify(response);
          //说明已经加入公司，需要跳转到首页
          if(response.hasOwnProperty('settlement') && response.settlement){
            console.log('login');
            $state.go('index.setting.userCompanyInfo');
          }else{
            console.log('createOrJoinCompany');
            $state.go('login.createOrJoinCompany');
          }
        });
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
        $scope.uploadImg = baseUrl+data.avatar;
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
  // util.drawBackground();
  var companyService = new Company();
  $scope.showAddCompany = function(){
    $state.go('login.addCompany');
  };
  $scope.avatorUpload = function(files, invalidFiles){
    if(invalidFiles && invalidFiles.length>0){
      util.showMsg(util.trans('file.type.invalid'));
      return;
    }
    if(files && files.length==0){
      util.showMsg(util.trans('file.required'));
      return;
    }
    companyService.avatar(files[0],util.getSessionId()).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        $scope.companyUploadAvatar=baseUrl+response.avatar;
        util.showMsg(util.trans('upload.success'));
      }else{
        util.showMsg(response.message);
      }
    });
  }
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
    companyService.tryJoin(model.companyCode).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('apply.join'));
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
trade.controller('userCompanyInfoController', ['$scope', '$rootScope', '$state', 'util', 'Company', 'User', '$cookies',
  function ($scope, $rootScope, $state, util, Company, User, $cookies) {
  $scope.$on('$viewContentLoaded', function(){
    util.adjustHeight();
  });
  if(!util.isLogin()){
    $state.go('login');
  }
  var userService = new User();
  console.log('src:'+$rootScope.userAvatar);
  $scope.user = util.getUserInfo();
  $scope.userInfo = util.getBySessionStorage('userInfo');
  if($scope.userInfo.avatar){
    $rootScope.userAvatar = $scope.userInfo.avatar;
  }
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
        userService.getDataByUserId($scope.userInfo.id).then(function(response){
          sessionStorage.userInfo = JSON.stringify(response.user);
        });
      }
    });
  }
  if($scope.user.hasOwnProperty('settlement')){
    companyService.getDataByCompanyId($scope.user.settlement).then(function(response){
      console.log('company:'+JSON.stringify(response.company));
      $scope.company = response.company;
      if($scope.company.avatar){
        $scope.company.avatar = baseUrl+$scope.company.avatar;
      }
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
  $scope.avatorUpload = function(files, invalidFiles){
    if(invalidFiles && invalidFiles.length>0){
      util.showMsg(util.trans('file.type.invalid'));
      return;
    }
    if(files && files.length==0){
      util.showMsg(util.trans('file.required'));
      return;
    }
    userService.avator(files[0],util.getSessionId()).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        $scope.userInfo.avatar=baseUrl+response.avatar;
        sessionStorage.userInfo = JSON.stringify($scope.userInfo);
        $rootScope.userAvatar = $scope.userInfo.avatar;
        util.showMsg(util.trans('upload.success'));
      }else{
        util.showMsg(response.message);
      }
    });
  }
  $scope.avatorCompanyUpload = function(files, invalidFiles){
    if(invalidFiles && invalidFiles.length>0){
      util.showMsg(util.trans('file.type.invalid'));
      return;
    }
    if(files && files.length==0){
      util.showMsg(util.trans('file.required'));
      return;
    }
    companyService.avatar(files[0],util.getSessionId()).then(function(response){
      console.log(response);
      if(response.hasOwnProperty('success')){
        $scope.company.avatar = baseUrl+response.avatar;
        util.showMsg(util.trans('upload.success'));
      }else{
        util.showMsg(response.message);
      }
    });
  }
  $scope.save = function(){
    $scope.fileInfo = $scope.file;
    Upload.upload({
      //服务端接收
      url: 'Ashx/UploadFile.ashx',
      //上传的同时带的参数
      data: {},
      //上传的文件
      file: file
    }).progress(function (evt) {
      //进度条
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
    }).success(function (data, status, headers, config) {
      //上传成功
      console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
      $scope.uploadImg = data;
    }).error(function (data, status, headers, config) {
      //上传失败
      console.log('error status: ' + status);
    });
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
  companyService.getAllStaffs().then(function(response){
    $scope.data = response.staffs;
  });
}]);
//设置头部Controller页面
trade.controller('approvalController', ['$scope', '$state', 'NgTableParams', 'Company', 'util', function ($scope, $state, NgTableParams, Company, util) {
  $scope.$on('$viewContentLoaded', function(){
    util.adjustHeight();
  });
  var companyService = new Company();
  companyService.getApplicationList().then(function(response){
    $scope.data = response.applications;
  });
  // $scope.tableParams = new NgTableParams({page: 1,count: 5}, {total:$scope.data.length, dataset: $scope.data});
  // $scope.getApplicationList = function(){
  //   companyService.getApplicationList().then(function(response){
  //
  //   });
  // }
  $scope.agree = function(id){
    companyService.acceptJoin(id).then(function(response){
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('operaton.success'))
        companyService.getApplicationList().then(function(response){
          $scope.data = response.applications;
        });
      }else{
        util.showMsg(util.trans('operaton.failure'))
      }
    })
  }
  $scope.reject = function(id){
    companyService.deleteJoin(id).then(function(response){
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('operaton.success'));
        companyService.getApplicationList().then(function(response){
          $scope.data = response.applications;
        });
      }else{
        util.showMsg(util.trans('operaton.failure'));
      }
    })
  }
}]);
//设置头部Controller页面
trade.controller('changePasswordController', ['$scope', '$state', 'NgTableParams', 'User', 'util', function ($scope, $state, NgTableParams, User, util) {
  $scope.$on('$viewContentLoaded', function(){
    util.adjustHeight();
  });
  var userService = new User();
  $scope.changePwd = function(model){
    userService.changePwd(model).then(function(response){
      if(response.hasOwnProperty('success')){
        util.showMsg(util.trans('change.pwd.success'));
        $state.go('index.setting.changePassword',{},{reload:true});
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
  $scope.$on('$viewContentLoaded', function(){
    util.adjustHeight();
  });
  var companyService = new Company();
  $scope.showAddDepart = function(){
    $uibModal.open({
      templateUrl:'views/modal/addDepart.html',
      controller:'addDepartController'
    });
  };
  $scope.showAddCategory = function(){
    $uibModal.open({
      templateUrl:'views/modal/addCategory.html',
      controller:'addCategoryController'
    });
  };
  var user = util.getUserInfo();
  if(user){
    companyService.getAllDepartments(user.settlement).then(function(response){
      $scope.departs = response.departments;
      if($scope.departs&&$scope.departs.length>0){
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
  $scope.$on('$viewContentLoaded', function(){
    util.adjustHeight();
  });
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
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
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
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    $scope.user = util.getUserInfo();
    var companyService = new Company();
    var templdateService = new Template();
    $scope.showAddDepart = function(){
      $uibModal.open({
        templateUrl:'views/modal/addDepart.html',
        controller:'addDepartController'
      });
    };

    $scope.showAddCustomCol = function(type){
      $scope.currentType = type;
      $uibModal.open({
        templateUrl:'views/modal/addCustomCol.html',
        controller:'addCustomColController'
      });
    };
    $scope.containDepart = function(name){
      return util.containInArray(name, $scope.currentDepartments);
    }
    $scope.containCustomCol = function(name, type){
      var array;
      if(type == 1){
        array = $scope.currentTemplate.content['Product detail'];
      }else if(type==2){
        array = $scope.currentTemplate.content['Specification detail'];
      }else if(type==3){
        array = $scope.currentTemplate.content['Shipping detail'];
      }
      return util.containInArray(name, array);
    }
    var templateObj = {
      id: null,
      companyId: $scope.user.settlement,
      departments: [],
      baseInfo: ['Category','Department','Currency','Description','ItemNumber','Material','Price','Size'],
      content: {
        'Product detail': [],
        'Specification detail': [],
        'Shipping detail': []
      },
      isDelete: null,
      createTime: null,
      tmpName: '模板名称',
      tmpInfo: '模板描述'
    }
    $scope.updateSelection = function($event, name, type){
      //选中，添加
      if($event.target.checked){
        if(type == 1){
          $scope.currentTemplate.content['Product detail'].push(name);
        }else if(type==2){
          $scope.currentTemplate.content['Specification detail'].push(name);
        }else if(type==3){
          $scope.currentTemplate.content['Shipping detail'].push(name);
        }else if(type ==4){
          $scope.currentTemplate.departments.push(name);
        }
      }else{//取消，删除
        if(type == 1){
          $scope.currentTemplate.content['Product detail'].splice(util.indexOf(name, $scope.currentTemplate.content['Product detail']),1);
        }else if(type==2){
          $scope.currentTemplate.content['Specification detail'].splice(util.indexOf(name, $scope.currentTemplate.content['Specification detail']),1);
        }else if(type==3){
          $scope.currentTemplate.content['Shipping detail'].splice(util.indexOf(name, $scope.currentTemplate.content['Shipping detail']),1);
        }else if(type ==4){
          $scope.currentTemplate.departments.splice(util.indexOf(name, $scope.currentTemplate.departments),1);
        }
      }
      console.log('pDetail:'+$scope.currentTemplate.content['Product detail'].join(',')+'\r\n'
        +$scope.currentTemplate.content['Specification detail'].join(',')+'\r\n'
        +$scope.currentTemplate.content['Shipping detail'].join(',')+'\r\n'
        +$scope.currentTemplate.departments.join(','));
    }
    $scope.initTemplate = function(index){
      $scope.currentTemplate = $scope.templates[index];
      $scope.currentDepartments = $scope.templates[index].departments;
    }
    if($scope.user.role == 'manager'){
      templdateService.getCompanyTemplates({companyId: $scope.user.settlement}).then(function(response){
        if(response.templates && response.templates.length>0){
          $scope.currentTemplate = response.templates[0];
        }else{
          $scope.currentTemplate = templateObj;
        }
        var pDetail = $scope.currentTemplate.content['Product detail'],
          sDetail = $scope.currentTemplate.content['Specification detail'],
          shipDetail = $scope.currentTemplate.content['Shipping detail'];
        for(var i in pDetail){
          if(!util.containInArray(pDetail[i], context.productDetail)){
            context.productDetail.push(pDetail[i]);
          }
        }
        for(var i in sDetail){
          if(!util.containInArray(sDetail[i], context.specificationDetail)){
            context.specificationDetail.push(sDetail[i]);
          }
        }
        for(var i in shipDetail){
          if(!util.containInArray(shipDetail[i], context.shippingDetail)){
            context.shippingDetail.push(shipDetail[i]);
          }
        }
        $scope.templates = response.templates;
        $scope.currentDepartments = $scope.currentTemplate.departments;
        $scope.productDetail = context.productDetail;
        $scope.specificationDetail=context.specificationDetail;
        $scope.shippingDetail = context.shippingDetail;
        companyService.getMyManageDepartment({companyId: $scope.user.settlement}).then(function(response){
          $scope.departs = response.departments;
        });
      });
    }else{
      templdateService.getDepartTemplates().then(function(response){
        $scope.currentTemplate = $scope.templates[0];
        $scope.templates = response.templates;
        $scope.currentDepartments = $scope.currentTemplate.departments;
        $scope.productDetail = context.productDetail;
        $scope.specificationDetail=context.specificationDetail;
        $scope.shippingDetail = context.shippingDetail;
        companyService.getMyManageDepartment({companyId: $scope.user.settlement}).then(function(response){
          $scope.departs = response.departments;
        });
      });
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
    $scope.$on('addDepartSuccessEvent', function(event, data){
      companyService.getAllDepartments($scope.user.settlement).then(function(response){
        $scope.departs = response.departments;
      });
    })
    $scope.$on('saveTemplateEvent', function(event, data){
      if($scope.currentTemplate.id){
        $scope.currentTemplate.templateId = $scope.currentTemplate.id;
        templdateService.update($scope.currentTemplate).then(function(response){
          if(response.hasOwnProperty('success')){
            util.showMsg(util.trans('update.success'));
          }else{
            util.showMsg(util.trans('update.failure'));
          }
        });
      }else{
        templdateService.create($scope.currentTemplate).then(function(response){
          if(response.hasOwnProperty('templateId')){
            util.showMsg(util.trans('add.success'));
          }else{
            util.showMsg(util.trans('add.failure'));
          }
        });
      }
    })
    $scope.$on('addCustomColEvent', function(event, data){
      if($scope.currentType == 1){
        $scope.productDetail.push(data);
        $scope.currentTemplate.content['Product detail'].push(data);
      }else if($scope.currentType ==2){
        $scope.specificationDetail.push(data);
        $scope.currentTemplate.content['Specification detail'].push(data);
      }else if($scope.currentType ==3){
        $scope.shippingDetail.push(data);
        $scope.currentTemplate.content['Shipping detail'].push(data);
      }
    })
  }]);


//设置头部Controller页面
trade.controller('contactController', ['$scope', '$state', '$uibModal', 'Company', 'util', 'context', 'Template', 'Contact',
  function ($scope, $state, $uibModal, Company, util, context, Template, Contact) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    var companyService = new Company(), contactService = new Contact();
    var defaultContact = {
      id: null,
      companyName: '供应商名称',
      extra: {
      },
      supplierNumber: null,
      supplierType: null,
      companyAddress1: null,
      companyAddress2: null,
      companyAddress3: null,
      companyAddress4: null,
      website: null,
      paymentTerm: null,
      products: null,
      contactItems: []
    };
    var defaultItem ={
      // id: null,
      name: '联系人姓名',
      position: null,
      email: null,
      tel: null,
      cellphone: null,
      fax: null
    };
    $scope.initContact = function(index){
      $scope.currentContact = $scope.contacts[index];
      $scope.currentItem = $scope.contacts[index].contactItems;
    }
    $scope.initItem = function(index){
      $scope.currentItem = $scope.currentContact.contactItems[index];
    }
    $scope.user = util.getUserInfo();
    $scope.userInfo = util.getBySessionStorage('userInfo');
    if($scope.user.settlement){
      companyService.getDataByCompanyId($scope.user.settlement).then(function(response){
        $scope.company = response.company;
      })
    }
    contactService.getContacts().then(function(response){
      $scope.contacts = response.contacts;
      if(!$scope.contacts || $scope.contacts.length==0){
        $scope.currentContact = defaultContact;
        $scope.currentItem = defaultItem;
      }else{
        angular.forEach(response.contacts, function(data){
          data.companyName = data.name;
          if(!data.hasOwnProperty('contactItems')){
            data.contactItems = [];
          }
        });
        $scope.currentContact = $scope.contacts[0];
        console.log($scope.currentContact.contactItems);
        $scope.currentItem = $scope.currentContact.contactItems[0];
      }
    });
    $scope.addSupplier = function(){
      $scope.currentContact = defaultContact;
      $scope.contacts.push($scope.currentContact);
    }
    $scope.saveSupplier = function(model){
      contactService.create(model).then(function(response){
        console.log(response);
        if(response.hasOwnProperty('success')){
          util.showMsg(util.trans('create.success'));
        }else{
          util.showMsg(response.message);
        }
      });
    }
    $scope.saveContact = function(model){
      model.contactCompanyItemId = $scope.currentContact.id;
      contactService.createContactItem(model).then(function(response){
        console.log(response);
        if(response.hasOwnProperty('success')){
          util.showMsg(util.trans('create.success'));
        }else{
          util.showMsg(response.message);
        }
      });
    }
    $scope.addContact = function(){
      $scope.currentContact.contactItems.push(defaultItem);
      $scope.currentItem = defaultItem;
    }
    $scope.$on('addSupplierEvent', function(event, data){
      $scope.currentContact = defaultContact;
      $scope.contacts.push($scope.currentContact);
    })
  }]);
//设置头部Controller页面
trade.controller('contactHeaderController', ['$rootScope', '$scope', '$state', 'Company', 'util', 'context',
  function ($rootScope, $scope, $state, Company, util, context) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    $scope.saveSupplier = function(){
      $rootScope.$broadcast('saveSupplierEvent');
    }
    $scope.addSupplier = function(){
      $rootScope.$broadcast('addSupplierEvent');
    }
  }]);
//设置头部Controller页面
trade.controller('addCustomColController', ['$rootScope', '$scope', '$state', '$uibModal','$uibModalInstance', 'Company', 'util', 'context',
  function ($rootScope, $scope, $state, $uibModal,$uibModalInstance, Company, util, context) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    $scope.submit = function(model){
      console.log(model);
      if(!model){
        util.showMsg(util.trans('validate.custom.col.no.null'));
        return;
      }
      $rootScope.$broadcast('addCustomColEvent', model);
      $uibModalInstance.close();
    }
    $scope.cancel = function(){
      $uibModalInstance.dismiss('cancel');
    }
  }]);
//设置头部Controller页面
trade.controller('templateHeaderController', ['$rootScope', '$scope', '$state', 'Company', 'util', 'context',
  function ($rootScope, $scope, $state, Company, util, context) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    $scope.saveTemplate = function(){
      $rootScope.$broadcast('saveTemplateEvent');
    }
    $scope.addTemplate = function(){
      $rootScope.$broadcast('addTemplateEvent');
    }
  }]);
trade.controller('priceController', ['$rootScope', '$scope', '$state', 'Company', 'util', 'context', 'Template', 'Quotation', 'Product', 'Import', 'Contact',
  function ($rootScope, $scope, $state, Company, util, context, Template, Quotation, Product, Import, Contact) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    $scope.user = util.getUserInfo();
    var companyService = new Company(), templateService = new Template(),contactService = new Contact(),
      quotationService = new Quotation(), productService = new Product(), importService = new Import();
    $scope.step1 = true;
    $scope.step2 = false;
    $scope.step3 = false;
    $scope.step4 = false;
    $scope.step5 = false;
    $scope.format = 'yyyy-MM-dd';
    $scope.popup1 = {
      opened: false
    };
    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };
    $scope.popup2 = {
      opened: false
    };
    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };
    contactService.getContacts().then(function(response){
      $scope.contacts = response.contacts;
    });
    $scope.showCompanyView = function(companyCode){
      if(companyCode){
        companyService.getDataByCompanyCode(companyCode).then(function(response){
          if(response.hasOwnProperty('company')){
            console.log(response);
            $scope.step1 = false;
            $scope.company = response.company;
            $scope.step2 = true;
          }else{
            util.showMsg(response.message);
          }
        });
      }else{
        util.showMsg(util.trans('validate.company.code.no.null'));
      }
    }
    $scope.productImageUpload = function(files, invalidFiles, idx){
      if(invalidFiles && invalidFiles.length>0){
        util.showMsg(util.trans('file.type.invalid'));
        return;
      }
      if(files && files.length==0){
        util.showMsg(util.trans('file.required'));
        return;
      }
      productService.addImage(files[0], util.getSessionId, $scope.currentProductId, idx)
        .then(function(response){
        console.log(response);
        if(response.hasOwnProperty('success')){
          $scope.companyUploadAvatar=baseUrl+response.avatar;
          util.showMsg(util.trans('upload.success'));
        }else{
          util.showMsg(response.message);
        }
      });;
    }
    $scope.showQuotationInfo = function(){
      $scope.step2 = false;
      $scope.step3 = true;
      companyService.getAllDepartments($scope.company.id).then(function(response){
        $scope.departs = response.departments;
        companyService.getCategories({companyId: $scope.company.id,department:$scope.departs}).then(function(response){
          $scope.companyCategoryMapping = response.categories;
        })
      })
    }
    $scope.selectDepart = function(){
      companyService.getCategories({companyId: $scope.company.id,department:$scope.departs}).then(function(response){
        $scope.categories = $scope.companyCategoryMapping[$scope.quotation.depart];
      })
    }
    $scope.showProductInfo = function(){
      //创建报价单
      quotationService.create({companyId: $scope.company.id, department: $scope.quotation.depart}).then(function(response){
        if(response.hasOwnProperty('success')){
          util.showMsg(util.trans('create.quotation.success'));
          $scope.responseQuotation = response;
          var templdates = response.templates;
          if(templdates && templdates.length>0){
            $scope.currentTemplate = templdates[0];
            $scope.productDetail = $scope.currentTemplate.content['Product detail'];
            $scope.productDetailValue = [],$scope.specificationDetailValue = [], $scope.shippingDetailValue = [];
            $scope.specificationDetail = $scope.currentTemplate.content['Specification detail'];
            $scope.shippingDetail = $scope.currentTemplate.content['Shipping detail'];
          }
        }else{
          util.showMsg(util.trans('create.quotation.success'));
          return;
        }
      });
      $scope.step3 = false;
      $scope.step4 = true;
      // templateService.getDepartTemplates({department: $scope.quotation.depart,companyId: $scope.company.id}).then(function(response){
      //   if(response.hasOwnProperty('templates')){
      //     var templdates = response.templates;
      //     if(templdates && templdates.length>0){
      //       $scope.currentTemplate = templdates[0];
      //       $scope.productDetail = $scope.currentTemplate.content['Product detail'];
      //       $scope.specificationDetail = $scope.currentTemplate.content['Specification detail'];
      //       $scope.shippingDetail = $scope.currentTemplate.content['Shipping detail'];
      //     }
      //   }
      // });
    }
    $scope.saveAndQuit = function(){
      var extra = {};
      for(var i in $scope.productDetail){
        extra[$scope.productDetail[i]] = $scope.productDetailValue[i];
      }
      for(var i in $scope.specificationDetail){
        extra[$scope.specificationDetail[i]] = $scope.specificationDetailValue[i];
      }
      for(var i in $scope.shippingDetail){
        extra[$scope.shippingDetail[i]] = $scope.shippingDetailValue[i];
      }
      productService.create({quotationId: $scope.responseQuotation.quotationId,
        categories: [$scope.quotation.category],
        extra: extra
      }).then(function(response){
        console.log(response);
        if(response.hasOwnProperty('success')){
         $scope.currentProductId=response.productionId;
         quotationService.addProduction({productionId: response.productionId, quotationId: $scope.responseQuotation.quotationId}).then(function(result){
           console.log(result);
           if(result.hasOwnProperty('success')){
             util.showMsg(util.trans('create.success'));
             //util.refresh('index.price');
             $scope.hasSave = true;
           }
         });
        }
      });
    }
    $scope.importExcel = function(files, invalidFiles){
      if(invalidFiles && invalidFiles.length>0){
        util.showMsg(util.trans('file.type.invalid'));
        return;
      }
      if(files && files.length==0){
        util.showMsg(util.trans('file.required'));
        return;
      }
      importService.importExcel(files[0],util.getSessionId(),$scope.responseQuotation.quotationId).then(function(response){
        console.log(response);
        // if(response.hasOwnProperty('success')){
        //   $scope.companyUploadAvatar=baseUrl+response.avatar;
        //   util.showMsg(util.trans('upload.success'));
        // }else{
        //   util.showMsg(response.message);
        // }
      });
    }
    $scope.batchImport = function(){
      $scope.step4 = false;
      $scope.step5 = true;
      $scope.hasSave = false;
    }
    $scope.addNewProduct = function(){
      $scope.hasSave = false;
      var extra = {};
      for(var i in $scope.productDetail){
        extra[$scope.productDetail[i]] = $scope.productDetailValue[i];
      }
      for(var i in $scope.specificationDetail){
        extra[$scope.specificationDetail[i]] = $scope.specificationDetailValue[i];
      }
      for(var i in $scope.shippingDetail){
        extra[$scope.shippingDetail[i]] = $scope.shippingDetailValue[i];
      }
      productService.create({quotationId: $scope.responseQuotation.quotationId,
        categories: [$scope.quotation.category],
        extra: extra
      }).then(function(response){
        console.log(response);
        if(response.hasOwnProperty('success')){
          quotationService.addProduction({productionId: response.productionId, quotationId: $scope.responseQuotation.quotationId}).then(function(result){
            console.log(result);
            if(result.hasOwnProperty('success')){
              util.showMsg(util.trans('create.success'));
              $scope.productDetailValue = [],$scope.specificationDetailValue = [], $scope.shippingDetailValue = [];
            }
          });
        }
      });
    }
  }]);
trade.controller('inboxController', ['$rootScope', '$scope', '$state', 'Box', 'util', 'context', 'Company', 'Product',
  function ($rootScope, $scope, $state, Box, util, context, Company, Product) {
    $scope.showDetailFlag = true;
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    $scope.myInterval = 3000;
    $scope.active = 0;
    $scope.noWrapSlides = false;
    var user = util.getUserInfo();
    var boxService = new Box(), companyService = new Company(), productService = new Product();
    $scope.initInbox = function(){
      boxService.inBox({}).then(function(response){
        $scope.response = response;
        $scope.inbox = response.boxItems;
        console.log(response);
        if($scope.inbox && $scope.inbox.length>0){
          $scope.currentDetail =$scope.inbox[0];
          $scope.productids = $scope.currentDetail.quotation.productionIds;
          $scope.productMap=[];
          if($scope.productids && $scope.productids.length>0){
            angular.forEach($scope.productids, function(data){
              productService.get(data).then(function(response){
                $scope.productMap.push(response.production);
              });
            });
          }
        }
      });
    }
    $scope.initInbox();
    $scope.initByDetail =function(data){
      $scope.currentDetail = data;
      $scope.productids = $scope.currentDetail.quotation.productionIds;
      if($scope.productids && $scope.productids.length>0){
        $scope.productMap=[];
        angular.forEach($scope.productids, function(data){
          productService.get(data).then(function(response){
            $scope.productMap.push(response.production);
          });
        });
      }
    }
    $scope.initByCategory = function(){
      companyService.getAllDepartments(user.settlement).then(function(response){
        $scope.departs = response.departments;
        $scope.departCategoryMapping = {};
        if($scope.departs&&$scope.departs.length>0){
          companyService.getCategories({companyId: user.settlement,department: $scope.departs}).then(function(response){
            $scope.departCategoryMapping= response.categories;
            for(var i in $scope.departCategoryMapping){
              $scope.departCategoryMapping[i].push('default');
            }
            $scope.currentDepart = $scope.departs[0];
            $scope.currentByCategory = response.categories[$scope.currentDepart][0];
          });
        }
      });
    }
    $scope.initCategoryData = function(depart, category){
      console.log(depart+'|'+category);
      $scope.currentDepart = depart;
      $scope.currentByCategory = $scope.departCategoryMapping[depart][0];
      productService.search({categories: [category], department: depart}).then(function(response){
        $scope.productMap=response.productions.concat();
      });
    }
    $scope.showDetail = function(){
      $scope.showDetailFlag = true;
      $('#li_detail').addClass('active');
      $('#li_category').removeClass('active');
      $scope.initInbox();
    }
    $scope.showCategory = function(){
      $scope.showDetailFlag = false;
      $('#li_category').addClass('active');
      $('#li_detail').removeClass('active');
      $scope.initByCategory();
    }
  }]);
trade.controller('outboxController', ['$rootScope', '$scope', '$state', 'Box', 'util', 'context', 'Product',
  function ($rootScope, $scope, $state, Box, util, context, Product) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    var boxService = new Box(), productService = new Product();
    boxService.outBox({}).then(function(response){
      $scope.response = response;
      $scope.outbox = response.boxItems;
      if($scope.outbox && $scope.outbox.length>0){
        $scope.currentDetail =$scope.outbox[0];
        $scope.initByDetail($scope.currentDetail);
      }
    });
    $scope.initByDetail = function(data){
      $scope.currentDetail = data;
      $scope.productids = $scope.currentDetail.quotation.productionIds;
      if($scope.productids && $scope.productids.length>0){
        $scope.productMap=[];
        angular.forEach($scope.productids, function(data){
          productService.get(data).then(function(response){
            $scope.productMap.push(response.production);
          });
        });
      }
    }
  }]);
trade.controller('draftController', ['$rootScope', '$scope', '$state', 'Box', 'util', 'context','Product',
  function ($rootScope, $scope, $state, Box, util, context, Product) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    var boxService = new Box(), productService = new Product();
    boxService.draftBox({}).then(function(response){
      $scope.response = response;
      $scope.drafts = response.boxItems;
      if($scope.drafts && $scope.drafts.length>0){
        $scope.currentDraft = $scope.drafts[0];
        $scope.initByDetail($scope.currentDraft);
      }
    });
    $scope.initByDetail = function(data){
      $scope.currentDraft = data;
      $scope.productids = $scope.currentDraft.quotation.productionIds;
      if($scope.productids && $scope.productids.length>0){
        $scope.productMap=[];
        angular.forEach($scope.productids, function(data){
          productService.get(data).then(function(response){
            $scope.productMap.push(response.production);
          });
        });
      }
    }
  }]);
trade.controller('garbageController', ['$rootScope', '$scope', '$state', 'Box', 'util', 'context', 'Product',
  function ($rootScope, $scope, $state, Box, util, context, Product) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    var boxService = new Box(), productService = new Product();
    boxService.junkBox({}).then(function(response){
      $scope.response = response;
      $scope.garbages = response.boxItems;
      if($scope.garbages && $scope.garbages.length>0){
        $scope.currentGarbage = $scope.garbages[0];
        $scope.initByDetail($scope.currentGarbage);
      }
    });
    $scope.initByDetail = function(data){
      console.log(data);
      $scope.currentGarbage = data;
      $scope.productids = $scope.currentGarbage.quotation.productionIds;
      if($scope.productids && $scope.productids.length>0){
        $scope.productMap=[];
        angular.forEach($scope.productids, function(data){
          productService.get(data).then(function(response){
            $scope.productMap.push(response.production);
          });
        });
      }
    }
  }]);
trade.controller('detailController', ['$rootScope', '$scope', '$state', 'Product', 'util', 'context', '$stateParams', 'Quotation',
  function ($rootScope, $scope, $state, Product, util, context, $stateParams, Quotation) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
      $('#div_real_image,#div_thumbs,#detailNavWrap').autoIMG();
    });
    var productService = new Product(), quotationService = new Quotation();
    quotationService.getById($stateParams.quotationId).then(function (response) {
      console.log(response);
      $scope.quotation = response.quotation;
      $scope.products = $scope.quotation.productions;
      // $scope.productids = $scope.quotation.productionIds;
      // if($scope.productids && $scope.productids.length>0){
      //   $scope.productMap=[];
      //   angular.forEach($scope.productids, function(data){
      //     productService.get(data).then(function(response){
      //       $scope.productMap.push(response.production);
      //     });
      //   });
      // }
    });
    productService.get($stateParams.id).then(function(response){
      $scope.product = response.production;
      $scope.images=[];
      for(var i=0;i<10;i++){
        if($scope.product.hasOwnProperty('image'+i)){
          $scope.images.push({url: $scope.product['image'+i], text: i+1, id: i});
        }
      }
      if($scope.images.length>0){
        $scope.currentImage = $scope.images[0];
      }
    });
    $scope.initImage = function(image){
      $scope.currentImage = image;
    }
  }]);
trade.controller('settingController', ['$rootScope', '$scope', '$state', 'util',
  function ($rootScope, $scope, $state, util) {
    $scope.logout = function(){
      console.log(1111);
      if(window.confirm(util.trans('is.logout'))){
        util.logout().then(function(response){
          if(response.hasOwnProperty('success')){
            $state.go('login');
            sessionStorage.clear();
          }else{
            $state.go('login');
            sessionStorage.clear();
          }
        });
      }
    }
  }]);
trade.controller('importController', ['$rootScope', '$scope', '$state', 'Import', 'util', 'context',
  function ($rootScope, $scope, $state, Import, util, context) {
    $scope.$on('$viewContentLoaded', function(){
      util.adjustHeight();
    });
    var importService = new Import();
    $scope.importExcel = function(files, invalidFiles){
      if(invalidFiles && invalidFiles.length>0){
        util.showMsg(util.trans('file.type.invalid'));
        return;
      }
      if(files && files.length==0){
        util.showMsg(util.trans('file.required'));
        return;
      }
      importService.importExcel(files[0],'82BAF409937DEF148B44F5796FAA06E9').then(function(response){
        console.log(response);
        // if(response.hasOwnProperty('success')){
        //   $scope.companyUploadAvatar=baseUrl+response.avatar;
        //   util.showMsg(util.trans('upload.success'));
        // }else{
        //   util.showMsg(response.message);
        // }
      });
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
        templateUrl: 'views/header/header.html'
      },
      'content': {
        templateUrl: 'views/user/register.html',
        controller: 'registerLoginController'
      },
      'footer': {
        templateUrl: 'views/footer/footer.html'
      }
    }
  }).state('login.createOrJoinCompany', {
    url: '/createOrJoinCompany',
    views: {
      'content@': {
        templateUrl: 'views/user/createOrJoinCompany.html',
        controller: 'companyController'
      }
    }
  }).state('login.register', {
    url: '/register',
    views: {
      'content@': {
        templateUrl: 'views/user/register.html',
        controller: 'registerLoginController'
      }
    }
  }).state('login.addCompany', {
    url: '/addCompany',
    views: {
      'content@': {
        templateUrl: 'views/company/addCompany.html',
        controller: 'companyController'
      }
    }
  }).state('login.joinCompany', {
    url: '/joinCompany',
    views: {
      'content@': {
        templateUrl: 'views/company/joinCompany.html',
        controller: 'companyController'
      }
    }
  }).state('fileupload', {
    url: '/fileupload',
    views: {
      'header': {
        templateUrl: 'views/header/header.html'
      },
      'content': {
        templateUrl: 'views/user/upload.html',
        controller: 'registerLoginController'
      },
      'footer': {
        templateUrl: 'views/footer/footer.html'
      }
    }
  }).state('index', {
    url: '/index',
    resolve: {
      deps: ['$ocLazyLoad',function($ocLazyLoad){
        return $ocLazyLoad.load(['scripts/vendor/jquery-2.1.4.min.js', 'scripts/vendor/mmGrid.js', 'scripts/vendor/Common.js']);
      }]
    },
    views: {
      'header': {
        templateUrl: 'views/header/setting-header.html'
      },
      'content': {
        templateUrl: 'views/home/home.html'
      },
      'left@index': {
        templateUrl: 'views/nav/leftNav.html'
      },
      'right@index': {
        templateUrl: 'views/setting/setting.html',
        controller: 'settingController'
      },
      'footer': {
        templateUrl: 'views/footer/footer.html'
      }
    }
  }).state('index.setting', {
    url: '/setting',
    views: {
      'header@': {
        templateUrl: 'views/header/setting-header.html'
      },
      'right@index': {
        templateUrl: 'views/setting/setting.html',
        controller: 'settingController'
      }
    }
  }).state('index.price', {
    url: '/price',
    views: {
      'header@': {
        templateUrl: 'views/header/price-header.html'
      },
      'right@index': {
        templateUrl: 'views/price/addPrice.html',
        controller: 'priceController'
      }
    }
  }).state('index.setting.userCompanyInfo', {
    url: '/userCompanyInfo',
    views: {
      'mainRight@index.setting': {
        templateUrl: 'views/setting/userCompanyInfo.html',
        controller: 'userCompanyInfoController'
      }
    }
  }).state('index.setting.changePassword', {
      url: '/changePassword',
      views: {
        'mainRight@index.setting': {
          templateUrl: 'views/setting/changePassword.html',
          controller: 'changePasswordController'
        }
      }
    }).state('index.setting.accountStatus', {
    url: '/accountStatus',
    views: {
      'mainRight@index.setting': {
        templateUrl: 'views/setting/accountStatus.html',
        controller: 'accountStatusController'
      }
    }
  }).state('index.memberManager', {
    url: '/memberManager',
    views: {
      'right@index': {
        templateUrl: 'views/setting/memberManager.html',
        controller: 'memberManagerController'
      }
    }
  }).state('index.approval', {
    url: '/approval',
    views: {
      'right@index': {
        templateUrl: 'views/setting/approval.html',
        controller: 'approvalController'
      }
    }
  }).state('index.contact', {
    url: '/contact',
    views: {
      'header@': {
        templateUrl: 'views/header/contact-header.html',
        controller: 'contactHeaderController'

      },
      'right@index': {
        templateUrl: 'views/contact/contact.html',
        controller: 'contactController'
      }
    }
  }).state('index.message', {
    url: '/message',
    views: {
      'header@': {
        templateUrl: 'views/header/message-header.html'
      },
      'right@index': {
        templateUrl: 'views/message/message.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.inbox', {
    url: '/inbox',
    views: {
      'header@': {
        templateUrl: 'views/header/inbox-header.html'
      },
      'right@index': {
        templateUrl: 'views/inbox/inbox.html',
        controller: 'inboxController'
      }
    }
  }).state('index.product.detail', {
    url: '/:quotationId/:id',
    resolve: {
      deps: ['$ocLazyLoad',function($ocLazyLoad){
        return $ocLazyLoad.load(['scripts/vendor/jquery-2.1.4.min.js', 'scripts/vendor/auto-image/jQuery.autoIMG.min.js']);
      }]
    },
    views: {
      'header@': {
        templateUrl: 'views/header/product-detail-header.html'
      },
      'right@index': {
        templateUrl: 'views/product/detail.html',
        controller: 'detailController'
      }
    }
  }).state('index.outbox', {
    url: '/outbox',
    views: {
      'header@': {
        templateUrl: 'views/header/outbox-header.html'
      },
      'right@index': {
        templateUrl: 'views/outbox/outbox.html',
        controller: 'outboxController'
      }
    }
  }).state('index.draft', {
    url: '/draft',
    views: {
      'header@': {
        templateUrl: 'views/header/draft-header.html'
      },
      'right@index': {
        templateUrl: 'views/draft/draft.html',
        controller: 'draftController'
      }
    }
  }).state('index.garbage', {
    url: '/garbage',
    views: {
      'header@': {
        templateUrl: 'views/header/garbage-header.html'
      },
      'right@index': {
        templateUrl: 'views/garbage/garbage.html',
        controller: 'garbageController'
      }
    }
  }).state('index.importProduct', {
    url: '/importProduct',
    views: {
      'header@': {
        templateUrl: 'views/header/import-product-header.html'
      },
      'right@index': {
        templateUrl: 'views/product/import.html',
        controller: 'importController'
      }
    }
  }).state('index.product', {
    url: '/product',
    views: {
      'header@': {
        templateUrl: 'views/header/product-header.html'
      },
      'right@index': {
        templateUrl: 'views/product/product.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.contactSetting', {
    url: '/contactSetting',
    views: {
      'header@': {
        templateUrl: 'views/header/contact-setting-header.html'
      },
      'right@index': {
        templateUrl: 'views/contact/contact-setting.html'
        // controller: 'registerLoginController'
      }
    }
  }).state('index.category', {
    url: '/category',
    views: {
      'header@': {
        templateUrl: 'views/header/category-header.html'
      },
      'right@index': {
        templateUrl: 'views/category/category.html',
        controller: 'departCategoryController'
      }
    }
  }).state('index.template', {
    url: '/template',
    views: {
      'header@': {
        templateUrl: 'views/header/template-header.html',
        controller: 'templateHeaderController'
      },
      'right@index': {
        templateUrl: 'views/template/template.html',
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
    prefix: 'i18n/',
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
