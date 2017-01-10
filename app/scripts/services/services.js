var services = angular.module('trade.services', ['oc.lazyLoad']),
  baseUrl = 'http://www.tablenote.com/';
//用户相关服务，包括注册、登录、获取用户信息
services.factory('User', ['util', function (util) {
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
    save: function(data){
      return util.tradePost(baseUrl+'company/create', data);
    },
    setCompanyCode: function(companyCode){
      return util.tradePost(baseUrl+'company/setCompanyCode', {companyCode: companyCode});
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
    }
  };
  return Company;
}]);

//工具类
services.factory('util', ['$ocLazyLoad', '$http', '$q', function ($ocLazyLoad, $http, $q) {
  return {
    drawBackground: function(){
      $ocLazyLoad.load('scripts/vendor/canvas.js').then(function(){
        drawBackGround();
      });
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
    tradePost: function(url, param){
      var delay = $q.defer();
      $http.post(url, param, {withCredentials: true,headers: {'Authorization':"auth"}})
        .then(function(data){
          console.log('success:' +data);
          if(data.status == 200){
            delay.resolve(data.data);
          }else{
            delay.reject(data.data);
          }
        },function(data,header,config,status){
          console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
          delay.reject(data.data);
        });
      return delay.promise;
    }
  };
}]);
