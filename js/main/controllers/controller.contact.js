'use strict';

function ContactListCtrl($scope, $http) {
  $http.get(WEB_ROOT+'/index.php/contact/index').success(function(data) {
    $scope.data = data;
  });
  
  $scope.newContact = function(){  
    $('#newContactBtn').attr('disabled','disabled');
    $('#creatNewDiv').slideDown(1000);
  }
  
  $scope.cancelNew = function(){  
    $('#newContactBtn').removeAttr('disabled');
    $('#creatNewDiv').slideUp(1000);
  }
  
  $scope.createNew = function(){
    $scope.cancelNew();
    var info = {};
    info.firstname = $("#newFN").val();
    info.lastname = $("#newLN").val();
    info.relation = $("#newRL").val();
    info.email = $("#newML").val();
    //$http.post(WEB_ROOT+'/index.php/contact/create', $.param(d)).success(function(data) {
    //});
    $.ajax({
      type: 'POST',
      url: WEB_ROOT+'/index.php/contact/create',
      data: info,
      success: function(data) {
        var obj = JSON.parse(data);
        $scope.data.unshift(obj);
        $scope.$apply();
      }
      
    })
  }
  
  $scope.deleteContact = function(obj){
    var cid = obj.id;
    $.ajax({
      type: 'post',
      url: WEB_ROOT+'/index.php/contact/delete',
      data: {id:cid},
      success: function(data) {
        for(var i=0;i<$scope.data.length; i++) {
          if($scope.data[i].id == cid){
            $scope.data.splice(i,1);
            $scope.$apply();
            break;
          }
        }
      }
    })
  }
  
  $scope.editContact = function(obj) {
    $scope.dismissLastEdit();
    
    var cid = obj.id;
    $("#row_"+cid).attr("status", "inEdit");
    var cells = $("#row_"+cid).children();
    var value = $(cells[0]).text();
    $(cells[0]).children()[0].style.display="none";
    $(cells[0]).append($('<input id="editFN" type="text" class="span2" value="'+ value +'" />'));
    var value = $(cells[1]).text();
    $(cells[1]).children()[0].style.display="none";
    $(cells[1]).append($('<input id="editLN" type="text" class="span2" value="'+ value +'" />'));
    var value = $(cells[3]).text();
    $(cells[3]).children()[0].style.display="none";
    $(cells[3]).append($('<input id="editML" type="text" class="span2" value="'+ value +'" />'));
    
    var value = $(cells[2]).text();
    $(cells[2]).children()[0].style.display="none";
    $('<select id="editRL" class="span2" ></select>').html($("#newRL").html()).appendTo(cells[2])
                            .find('option[value="'+value+'"]').attr("selected", true);
    
    $(cells[4]).children()[0].style.display="none";
    $(cells[4]).children()[1].style.display="";
  }
  
  $scope.cancelEdit = function(obj) {
    var cid = obj.id;
    $("#row_"+cid).removeAttr("status");
    var cells = $("#row_"+cid).children();
    
    for(var i=0; i<cells.length-1; i++){
      $(cells[i]).children()[0].style.display="";
      $(cells[i]).children().last().remove();
    }
    $(cells[4]).children()[0].style.display="";
    $(cells[4]).children()[1].style.display="none";
  }
  
  $scope.updateContact = function(obj) {
    var info = {};
    info.id = obj.id;
    info.firstname = $("#editFN").val();
    info.lastname = $("#editLN").val();
    info.relation = $("#editRL").val();
    info.email = $("#editML").val();
    
    $.ajax({
      type: 'post',
      url: WEB_ROOT+'/index.php/contact/update',
      data: info,
      success: function(data) {
        var o = JSON.parse(data);
        
        for(var i=0;i<$scope.data.length; i++) {
          if($scope.data[i].id == o.id){
            $scope.data[i] = o;
            $scope.$apply();
            break;
          }
        }
      }
    })
    
    $scope.cancelEdit(obj);
  }
  
  $scope.dismissLastEdit = function() {
    for(var i=0;i<$scope.data.length; i++) {
      if( typeof $("#row_"+$scope.data[i].id).attr("status") != "undefined" ){
        $scope.cancelEdit($scope.data[i]);
      }
    }
  }
}

