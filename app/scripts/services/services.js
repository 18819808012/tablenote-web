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
      var delay = $q.defer();
      delay.resolve({settlement: null, opid: '584fb3a08d7e52683cc7bc0f', user: '584fb3a08d7e52683cc7bc0f', success: ''});
      //return delay.promise;
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
