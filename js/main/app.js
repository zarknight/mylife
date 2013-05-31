'use strict';

var mylifeApp = angular.module('mylifeApp', []).config([
  '$routeProvider', function($routeProvider){
    $routeProvider.when('/profile', {
        templateUrl: WEB_ROOT + '/js/main/partials/profile.html',
        controller: ProfileCtrl
      }).when('/contacts', {
        templateUrl: WEB_ROOT + '/js/main/partials/contact-list.html',
        controller: ContactListCtrl
      }).otherwise({
        templateUrl: WEB_ROOT + '/js/main/partials/dashboard.html',
        controller: DashboardCtrl
      });
  }
]);
