'use strict';

var mylifeApp = angular.module('mylifeApp', []).config([
  '$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/profile', { controller: ProfileCtrl, templateUrl: WEB_ROOT + '/js/main/partials/profile.html'})
      .when('/contacts', { controller: ContactListCtrl, templateUrl: WEB_ROOT + '/js/main/partials/contact-list.html' })
      .when('/messages', { controller: MessageListCtrl, templateUrl: WEB_ROOT + '/js/main/partials/message-list.html' })
      .when('/createMessage', { controller: MessageEditCtrl, templateUrl: WEB_ROOT + '/js/main/partials/messageEdit.html' })
      .otherwise({ controller: DashboardCtrl, templateUrl: WEB_ROOT + '/js/main/partials/dashboard.html' });
  }
]);
