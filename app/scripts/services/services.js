/**
 * Created by zhangxp10 on 2017-1-6.
 */
var services = angular.module('trade.services', []),
  baseUrl = "http://www.tablenote.com/";
services.factory('register', ['$http', function ($http) {
  $http.post({
    url: baseUrl+'auth/register',
    method: 'POST',
    data: {
      'user': 'I will fuck your mother!',
      'email': 'kimffy@email.com',
      'password': 'JiefzzLon',
      'wechat': '1077101169',
      'linkin': 'system@tablenote.com'
    }
  }).success(function(data,header,config,status){
    console.log('success:' +data+'|'+header+'|'+config+'|'+ status);
  }).error(function(data,header,config,status){
    console.log('error:' +data+'|'+header+'|'+config+'|'+ status);
  });
}]);
