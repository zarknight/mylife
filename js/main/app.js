'use strict';

var mylifeApp = angular.module('mylifeApp', []).config([
  '$routeProvider', function($routeProvider){
    $routeProvider.when('/profile', {
        templateUrl: WEB_ROOT + '/js/main/partials/profile.html',
        controller: ProfileCtrl
      }).when('/contacts', {
        templateUrl: WEB_ROOT + '/js/main/partials/contact-list.html',
        controller: ContactListCtrl
      }).when('/messages', {
        templateUrl: WEB_ROOT + '/js/main/partials/message-list.html',
        controller: MessageListCtrl
      }).when('/createMessage', {
        templateUrl: WEB_ROOT + '/js/main/partials/messageEdit.html',
        controller: MessageEditCtrl
      }).when('/events', {
        templateUrl: WEB_ROOT + '/js/main/partials/event-list.html',
        controller: EventListCtrl
      }).otherwise({
        templateUrl: WEB_ROOT + '/js/main/partials/dashboard.html',
        controller: DashboardCtrl
      });
  }
]);
