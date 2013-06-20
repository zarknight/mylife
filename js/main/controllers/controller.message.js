'use strict';

function MessageListCtrl($scope, $http, $routeParams) {
  $scope.type = (typeof $routeParams.type != "undefined")? ($routeParams.type):1;
  
  $scope.newMessage = function() {
    window.location.href = "#/createMessage?type=create";
  }
  
  $scope.reloadMessage = function(){
    $http.get(WEB_ROOT+'/index.php/submission/index?type='+$scope.type).success(function(data) {
      $scope.data = data;
    });
  }
  
  $scope.reloadMessage();
}

var editorSetting = {
  langType: 'en',
  resizeType: 0,
  items: [
    'fontname', 'fontsize', '|', 
    'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'removeformat', '|', 
    'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent','|', 
    'image', 'link'
  ],
}

function MessageEditCtrl($scope,$routeParams) {
  if ($routeParams.type == 'create') {
    $scope.title = "Create";
  } else {
    $scope.title = "Edit";
  }
  
  var editor = KindEditor.create('#editContent', editorSetting);

  $("#nav").hide();

  $scope.discard = function(){
    var res = window.confirm("Are you sure to discard the message?");   
    if (res) {
      $("#nav").show();
      window.location.href = "#/messages";
    }
  }
  
  $scope.save = function(){
    $("#nav").show();
    window.location.href = "#/messages?type=3";
  }
  
  $scope.send = function(){
    $("#nav").show();
    window.location.href = "#/messages?type=1";
  }

}
