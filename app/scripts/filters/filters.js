var filters = angular.module('trade.filters', []);
filters.filter('i18n', function($translate){
  return function(key) {
    if(key){
      return $translate.instant(key);
    }
  };
});
