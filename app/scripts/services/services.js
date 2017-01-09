/**
 * Created by zhangxp10 on 2017-1-6.
 */
var services = angular.module('trade.services', ['oc.lazyLoad']),
  baseUrl = 'http://www.tablenote.com/';
services.factory('register', ['$http', '$q', '$sce', function ($http, $q, $sce) {
  console.log('register....');
  var delay = $q.defer();
  delay.resolve({
    'sucess': '1',
    'userId': '581e00448d7e5204f67176d1'
  });
  return delay.promise;
}]);
//用户相关服务，包括注册、登录
services.factory('User', ['$http', '$q', '$sce', function ($http, $q, $sce) {
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
      var delay = $q.defer();
      $http.post(baseUrl+'auth/register', data)
        .then(function(data){
          if(data.status == 200){
            delay.resolve(data.data);
          }else{
            delay.reject(data.data);
          }
        },function(data,header,config,status){
          console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
          delay.reject(data.data);
        });
      // var registerUrl = $sce.trustAsResourceUrl(baseUrl+'auth/register');
      // $http.jsonp(registerUrl, {jsonpCallbackParam: 'callback'})
      //   .then(function(data,header,config,status){
      //     console.log('success:' +data+'|'+header+'|'+config+'|'+ status);
      //     delay.resolve(data);
      //   },function(data,header,config,status){
      //     console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
      //     delay.reject(data);
      //   });
      return delay.promise;
    },
    getDataByUserId: function(userId){
      var delay = $q.defer();
      $http.jsonp(baseUrl+'/user/detail', {userId: userId})
        .then(function(data,header,config,status){
          console.log('success:' +data+'|'+header+'|'+config+'|'+ status);
          delay.resolve(data);
          },function(data,header,config,status){
          console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
          delay.reject(data);
        });
      return delay.promise;
    },
    getDataByEmail: function(email){

    }
  };
  return User;
}]);

//工具类
services.factory('util', ['$ocLazyLoad', function ($ocLazyLoad) {
  return {
    drawBackground: function(){
      // $ocLazyLoad.load('scripts/vendor/canvas.js').then(function(){
      //   drawBackground();
      // });
    },
    showMsg: function(msg,stay){
      $(".show_msg_box").remove();
      stay=stay?stay:3000;
      var show_box = "<div class='show_msg_box'><p class='show_msg'>"+ msg +"</p></div>";
      $("body").append(show_box);
      $(".show_msg_box").stop(true,true).fadeIn(3000);
      $(".show_msg_box").stop(true,true).fadeOut(stay);
    }
  };
}]);
