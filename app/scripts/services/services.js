/**
 * Created by zhangxp10 on 2017-1-6.
 */
var services = angular.module('trade.services', []),
  baseUrl = 'http://www.tablenote.com/';
services.factory('register', ['$http', '$q', '$sce', function ($http, $q, $sce) {
  console.log('register....');
  var delay = $q.defer();
  delay.resolve({
    'sucess': '1',
    'userId': '581e00448d7e5204f67176d1'
  });
  // $http.post('http://www.tablenote.com/auth/register',{
  //   'user': 'I will fuck your mother!',
  //   'email': 'kimffy@email.com',
  //   'password': 'JiefzzLon',
  //   'wechat': '1077101169',
  //   'linkin': 'system@tablenote.com'
  // },{headers: {'content-type': 'application/json'}
  // }).then(function(data,header,config,status){
  //   console.log('success:' +data+'|'+header+'|'+config+'|'+ status);
  //   delay.resolve(data);
  // },function(data,header,config,status){
  //   console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
  //   delay.reject(data);
  // });
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
      // $sce.trustAsResourceUrl(baseUrl+'/auth/register?callback=JSON_CALLBACK');
      // $http.jsonp(baseUrl+'/auth/register?callback=JSON_CALLBACK', data)
      //   .then(function(data,header,config,status){
      //     console.log('success:' +data+'|'+header+'|'+config+'|'+ status);
      //     delay.resolve(data);
      //   },function(data,header,config,status){
      //     console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
      //     delay.reject(data);
      //   });
      var registerUrl = $sce.trustAsResourceUrl(baseUrl+'auth/register');
      $http.jsonp(registerUrl, {jsonpCallbackParam: 'callback'})
        .then(function(data,header,config,status){
          console.log('success:' +data+'|'+header+'|'+config+'|'+ status);
          delay.resolve(data);
        },function(data,header,config,status){
          console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
          delay.reject(data);
        });
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
