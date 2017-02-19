var filters = angular.module('trade.filters', []);
filters.filter('i18n', function($translate){
  return function(key) {
    if(key){
      return $translate.instant(key);
    }
  };
});
filters.filter('baseUrl', function(){
  return function(key) {
    if(key){
      return baseUrl+key;
    }else{
      return '../../images/userIcon.gif';
    }
  };
});
