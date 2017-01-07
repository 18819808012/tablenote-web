/**
 * Created by zhangxp10 on 2017-1-6.
 */
var services = angular.module('trade.services', []),
  baseUrl = 'http://www.tablenote.com/';
services.factory('register', ['$http', '$q', function ($http, $q) {
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

services.factory('User', ['$http', '$q', function ($http, $q) {
  function User(data) {
    if(data){
      this.setData(data);
    }
  }
  User.prototype = {
    setData: function(data){
      angular.extend(this, data);
    },
    getDataByUserId: function(userId){
      $http.post(baseUrl+'/user/detail', {userId: userId},{headers: {'content-type': 'application/json'}})
        .then(function(data,header,config,status){
          console.log('success:' +data+'|'+header+'|'+config+'|'+ status);
          delay.resolve(data);
          },function(data,header,config,status){
          console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
          delay.reject(data);
        });
    },
    getDataByEmail: function(email){

    }
  };
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
