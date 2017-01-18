var services = angular.module('trade.services', ['oc.lazyLoad']),
  baseUrl = 'http://www.tablenote.com/';
//用户相关服务，包括注册、登录、获取用户信息
services.factory('User', ['util', '$q', function (util, $q) {
  function User(data) {
    if(data){
      this.setData(data);
    }
  }
  User.prototype = {
    setData: function(data){
      angular.extend(this, data);
    },
    register: function(data){
      return util.tradePost(baseUrl+'auth/register', data);
    },
    login: function(data){
      return util.tradePost(baseUrl+'auth/login', data);
    },
    getDataByUserId: function(userId){
      return util.tradePost(baseUrl+'user/detail', {userId: userId});
    },
    getDataByEmail: function(email){
      return util.tradePost(baseUrl+'user/detail', {email: email});
    },
    update: function(data){
      return util.tradePost(baseUrl+'user/updateProfile', data);
    },
    changePwd: function(data){
      return util.tradePost(baseUrl+'auth/updatePassword', data)
    }
  };
  return User;
}]);

//公司相关服务
services.factory('Company', ['util', function (util) {
  function Company(data) {
    if(data){
      this.setData(data);
    }
  }
  Company.prototype = {
    setData: function(data){
      angular.extend(this, data);
    },
    setData: function(data){
      angular.extend(this, data);
    },
    save: function(data){
      return util.tradePost(baseUrl+'company/create', data);
    },
    setCompanyCode: function(companyCode){
      return util.tradePost(baseUrl+'company/setCompanyCode', {companyCode: companyCode});
    },
    tryJoin: function(companyCode){
      return util.tradePost(baseUrl+'company/tryJoin', {companyCode: companyCode});
    },
    avatar: function(userId){
      return util.tradePost(baseUrl+'company/avatar', {userId: userId});
    },
    getDataByCompanyId: function(companyId){
      return util.tradePost(baseUrl+'company/detail', {companyId: companyId});
    },
    getDataByCompanyCode: function(companyCode){
      return util.tradePost(baseUrl+'company/detail', {companyCode: companyCode});
    },
    update: function(data){
      return util.tradePost(baseUrl+'company/updateProfile', data);
    },
    changeCompanyLevel: function(data){
      return util.tradePost(baseUrl+'company/create', data);
    },
    getAllDepartments: function(companyId){
      return util.tradePost(baseUrl+'company/allDepartments', {companyId: companyId});
    },
    fireSelf: function(){
      return util.tradePost(baseUrl+'company/fireMyself')
    },
    getApplicationList: function(){
      return util.tradePost(baseUrl+'company/getApplicationList', {pageNumber: 1, pageSize: 10000})
    },
    getAllStaffs: function(){
      return util.tradePost(baseUrl+'company/getAllStaffs');
    },
    addDepart: function(data){
      return util.tradePost(baseUrl+'company/createDepartments', data);
    },
    removeDepart: function(data){
      return util.tradePost(baseUrl+'company/removeDepartment', {"department": data});
    },
    addCategory: function(data){
      return util.tradePost(baseUrl+'company/addCategory', data);
    },
    removeCategory: function(data){
      return util.tradePost(baseUrl+'company/removeCategory', data);
    },
    getCategories: function(data){
      return util.tradePost(baseUrl+'company/getCategories', data);
    },
    getMyManageDepartment: function(data){
      'company/acceptJoin'
      return util.tradePost(baseUrl+'company/myManageDepartment', data);
    },
    acceptJoin: function(data){
      return util.tradePost(baseUrl+'company/acceptJoin', {joinApplicationId: data});
    },
    deleteJoin: function(data){
      return util.tradePost(baseUrl+'company/deleteJoin', {joinApplicationId: data});
    }
  };
  return Company;
}]);

//公司相关服务
services.factory('Template', ['util', function (util) {
  function Template(data) {
    if(data){
      this.setData(data);
    }
  }
  Template.prototype = {
    setData: function(data){
      angular.extend(this, data);
    },
    create: function(data){
      return util.tradePost(baseUrl+'template/create', data);
    },
    update: function(data){
      return util.tradePost(baseUrl+'template/update', data);
    },
    delete: function(data){
      return util.tradePost(baseUrl+'company/create', data);
    },
    getCompanyTemplates: function(data){
      return util.tradePost(baseUrl+'template/getCompanyTemplates', data);
    },
    getTemplateById: function(){
      return util.tradePost(baseUrl+'template/get', {templateId: data})
    },
    getDepartTemplates: function(data){
      return util.tradePost(baseUrl+'template/getAllTemplates', data);
    }
  };
  return Template;
}]);

//公司相关服务
services.factory('Contact', ['util', function (util) {
  function Contact(data) {
    if(data){
      this.setData(data);
    }
  }
  Contact.prototype = {
    setData: function(data){
      angular.extend(this, data);
    },
    create: function(data){
      return util.tradePost(baseUrl+'contact/createContactCompany', data);
    },
    createContactItem: function(data){
      return util.tradePost(baseUrl+'contact/createContactItem', data);
    },
    deleteContactCompany: function(data){
      return util.tradePost(baseUrl+'contact/deleteContact', data);
    },
    deleteContactItem: function(data){
      return util.tradePost(baseUrl+'contact/deleteContactItem', data);
    },
    getContacts: function(){
      return util.tradePost(baseUrl+'contact/getContacts', {templateId: data})
    }
  };
  return Contact;
}]);

//工具类
services.factory('util', ['$ocLazyLoad', '$http', '$q', 'i18n', '$state', function ($ocLazyLoad, $http, $q, i18n, $state) {
  return {
    drawBackground: function(){
      $ocLazyLoad.load('scripts/vendor/canvas.js').then(function(){
        drawBackGround();
      });
    },
    trans: function(key){
      return i18n.t(key);
    },
    showMsg: function(msg,callback,stay){
      $("div.show_msg_box").remove();
      stay=stay?stay:3000;
      var show_box = "<div class='show_msg_box'><p class='show_msg'>"+ msg +"</p></div>";
      $("body").append(show_box);
      $("div.show_msg_box").stop(true,true).fadeIn();
      $("div.show_msg_box").stop(true,true).delay(stay).fadeOut(100,function(){
        if(callback){
          callback();
        }
      });
    },
    refresh: function(path){
      if(path){
        $state.go(path, {}, {reload: true});
      }
    },
    tradePost: function(url, param){
      var delay = $q.defer();
      $http.post(url, param, {'withCredentials':true})
        .then(function(data){
          console.log('[success] url:'+url+'| param:'+JSON.stringify(param)+'| cost:'+(data.config.responseTimestamp-data.config.requestTimestamp));
          console.log('success:' +data);
          if(data.status == 200){
            delay.resolve(data.data);
          }else{
            delay.reject(data.data);
          }
        },function(data,header,config,status){
          console.log('[error] url:'+url+'| param:'+JSON.stringify(param)+'| cost:'+(data.config.responseTimestamp-data.config.requestTimestamp));
          console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
          delay.reject(data.data);
        });
      return delay.promise;
    },
    tradeGet: function(url, param){
      var delay = $q.defer();
      $http.get(url, {params: param,'withCredentials':true})
        .then(function(data){
          console.log('[success] url:'+url+'| param:'+JSON.stringify(param)+'| cost:'+(data.config.responseTimestamp-data.config.requestTimestamp));
          console.log('success:' +data);
          if(data.status == 200){
            delay.resolve(data.data);
          }else{
            delay.reject(data.data);
          }
        },function(data,header,config,status){
          console.log('[error] url:'+url+'| param:'+JSON.stringify(param)+'| cost:'+(data.config.responseTimestamp-data.config.requestTimestamp));
          console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
          delay.reject(data.data);
        });
      return delay.promise;
    },
    getBySessionStorage: function(key){
      if(!sessionStorage){
        util.showMsg('您的浏览器不支持sessionStorage!');
      }
      if(sessionStorage[key]){
        return JSON.parse(sessionStorage.getItem(key));
      }
    },
    containInArray: function(key, array){
      if(!key || !array){
        return false;
      }
      for(var i in array){
        if(key === array[i]){
          return true;
        }
      }
      return false;
    },
    indexOf: function(name, array){
      for(var i in array){
        if(name === array[i]){
          return i;
        }
      }
      return -1;
    },
    getUserInfo: function(){
      if(!sessionStorage){
        util.showMsg('您的浏览器不支持sessionStorage!');
      }
      if(sessionStorage.user){
        return JSON.parse(sessionStorage.user);
      }
    },
    isLogin: function(){
      var userInfo = this.getUserInfo();
      if(userInfo){
        return true;
      }
      return false;
    },
    isManagerRole: function(){
      if(sessionStorage.user){
        var user = JSON.parse(sessionStorage.user);
        if(user.role == 'manager'){
          return true;
        }
      }
      return false;
    },
    adjustHeight: function(){
      // 根据窗口高度调整应聘信息弹出框高度大小
      var WH = $(window).height();
      var WW = $(window).width();
      var conHeader = $(".conHeader").outerHeight();   //获取头部固定栏高度
      var contactsBox2H = $(".contactsBox2H").outerHeight();  //获取联系人设置里联系人信息和自定义字段高度
      var tempH = $(".tempH").outerHeight(); //获取模板列表header高度
      var w24 = $(".w24bf").width();
      var loginH = $("#login").height();
      var registerH = $("#register").height();
      $("div.MinH").css("height",WH-conHeader-10);
      $("div.MinH2").css("height",WH-conHeader-10);
      $("div.contactsMsg").css("height",WH-conHeader-contactsBox2H-12); //联系人设置
      $("#tempBoxWrap").css("height",WH-conHeader-tempH-12);  //模板列表
      $("div.MinH_h").css("height",WH-conHeader-52);  //联系人列表
      $("div.concactsAssessWrap").css("height",WH-conHeader-62);  //供应商评估
      $("#productListMsg").css("height",WH-conHeader-122);  //收件箱 详情
      $("#productListMsgB").css("height",WH-conHeader-47);  //收件箱 详情
      $("#classifyUl").css("height",WH-conHeader-54);  //收件箱 详情
      $("#changList").css("left",w24 + 220)
      $("#contableWrapList").css("height",WH - conHeader - 141);
      $("#dragTableWrap").css("height",WH - conHeader - 200);//编辑页面表格高度
      $("#dragTableWrap02").css("height",WH - conHeader - 60);//编辑页面表格高度
      $("#BasicInfoWrap").css("height",WH - conHeader - 50);//设置页面退出按钮盒子高度
      $("#userProduct").css("height",WH - conHeader - 82);//userMsg 负责的产品
      $("#userDepartment").css("height",WH - conHeader - 82);//userMsg 部门
      $("#userSort").css("height",WH - conHeader - 82);//userMsg 分类
      $("#login").css("padding-top",(WH - registerH)/2);//登陆高度
      $("#register").css("padding-top",(WH - registerH)/2);//注册高度
      $("#CreatOrJoin").css("padding-top",WH/3); //选择创建or加入公司
      $("#joinDialog").css("margin-top",WH/3);
    }
  };
}]);
//http 拦截器 计算请求的时间
services.factory('watcher', [function() {
  var watcher = {
    request: function(config) {
      config.requestTimestamp = new Date().getTime();
      return config;
    },
    response: function(response) {
      response.config.responseTimestamp = new Date().getTime();
      return response;
    }
  };
  return watcher;
}]);
//i18n国际化服务
services.factory('i18n', ['$translate', function($translate) {
  return {
    t: function(key){
      if(key){
        return $translate.instant(key);
      }
      return key;
    }
  };
}]);

//当前运行环境，一般用于数据共享
services.factory('context', function(){
  return {
    currentDepart: null,
    productDetail: ['Item number','Description','Price','Unit','MOQ','Package'],
    specificationDetail: ['Size', 'Material'],
    shippingDetail: ['QTY/Inner', 'Inner Length', 'Inner Width', 'Inner Height', 'Inner CBM', 'QTY/CTN', 'CTN Length',
      'CTN Width', 'CTN Height', 'CTN CBM', 'CTN NW', 'CTN GW', 'Qty/20ft', 'Qty/40ft', 'Qty/40HQ']
  };
});
