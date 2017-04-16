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
      return baseUrl+key+'/128/128';
    }else{
      return '../../images/userIcon.gif';
    }
  };
});
filters.filter('getValue', function(){
  return function(array,key) {
    if(array){
      for(var i =0;i<array.length;i++){
        if(key==array[i].key){
          return array[i].value;
        }
      }
    }
    return '';
  };
});
filters.filter('dataSubString', function(){
  return function(key) {
    if(key){
      console.log(key);
      return key.substring(0,10);
    }
    return undefined;
  };
});

